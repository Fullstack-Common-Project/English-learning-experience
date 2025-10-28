using EnglishGamesPlatform.Backend.Data;
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Models.GameInitialDatas;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using EnglishGamesPlatform.Backend.Models.Entities;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class RhymeTimeRepository : IGeneralGameRepository
    {
        private readonly AppDbContext db;
        private readonly Random random = new();

        public RhymeTimeRepository(AppDbContext db)
        {
            this.db = db;
        }

        // השם של המשחק בדיוק כפי שצריך להופיע ב־DB או בהזרקת התלויות
        public string GameName => "Rhyme Time";

        // פעולה שמחזירה את הנתונים ההתחלתיים של המשחק
        public async Task<GameInitialData?> GetData()
        {
            // נאסוף מאגר ראשוני של מילים (כדי לבדוק ביניהן חריזה) – שיקול ביצועים.
            var wordsPool = await db.Words
                .Where(w => w.WordText.Length >= 3)
                .OrderBy(w => Guid.NewGuid())
                .Take(800) // אפשר לכוונן (גדול יותר = יותר סיכוי לחרוזים)
                .Select(w => w.WordText)
                .ToListAsync();

            if (wordsPool.Count < 6) return null;

            // ננסה עד 8 בסיסים שונים עד שנמצא בסיס עם 1–3 חרוזים
            for (int attempt = 0; attempt < 8; attempt++)
            {
                var baseWord = wordsPool[random.Next(wordsPool.Count)];
                var baseNorm = Normalize(baseWord);

                // מועמדים לבדיקה (בלי המילה עצמה וללא מי שמכיל אותה כ־substring)
                var candidates = wordsPool
                    .Where(w => !string.Equals(Normalize(w), baseNorm, StringComparison.Ordinal))
                    .Where(w => !Normalize(w).Contains(baseNorm)) // מונע apple/pineapple
                    .Distinct()
                    .ToList();

                // מפרידים לרשימת חרוזים ומסיחים
                var rhymes = new List<string>();
                var nonRhymes = new List<string>();

                foreach (var cand in candidates)
                {
                    if (IsRhyme(baseNorm, Normalize(cand)))
                        rhymes.Add(cand);
                    else
                        nonRhymes.Add(cand);
                }

                // כמה חרוזים לשבץ בפועל (1–3 אם יש; אם אין, ננסה בסיס אחר)
                var rhymeCount = Math.Min(3, rhymes.Count);
                if (rhymeCount == 0) continue;  // בסיס לא טוב – ננסה בסיס אחר

                rhymeCount = random.Next(1, rhymeCount + 1); // בוחרים 1..rhymeCount

                var pickedRhymes = rhymes.OrderBy(_ => random.Next()).Take(rhymeCount).ToList();
                var options = new List<string>(pickedRhymes);

                // משלים ל-4 אופציות במסיחים
                options.AddRange(nonRhymes
                    .Where(n => !options.Contains(n))
                    .OrderBy(_ => random.Next())
                    .Take(4 - options.Count));

                // אם משום מה עדיין פחות מ-4, נשלים שרירותית מהמאגר
                if (options.Count < 4)
                {
                    options.AddRange(wordsPool
                        .Where(w => !options.Contains(w) && Normalize(w) != baseNorm)
                        .OrderBy(_ => random.Next())
                        .Take(4 - options.Count));
                }

                // ערבוב סופי
                options = options.OrderBy(_ => random.Next()).Take(4).ToList();

                // חישוב האינדקסים הנכונים מחדש לאחר הערבוב
                var correct = new List<int>();
                for (int i = 0; i < options.Count; i++)
                {
                    var optNorm = Normalize(options[i]);
                    if (IsRhyme(baseNorm, optNorm) && !optNorm.Contains(baseNorm))
                        correct.Add(i);
                }

                // ביטחון: אם אחרי הערבוב מסיבה כלשהי אין חרוזים – ננסה בסיס אחר
                if (correct.Count == 0) continue;

                return new RhymeTimeData
                {
                    Word = baseWord,
                    Options = options,
                    CorrectIndices = correct.Distinct().OrderBy(x => x).ToList()
                };
            }

            // אם לא מצאנו בסיס מתאים אחרי כמה נסיונות – נחזיר null (נדיר)
            return null;
        }

        /* ----------------- Helpers ----------------- */

        // נירמול בסיסי
        private static string Normalize(string s) =>
            (s ?? string.Empty).Trim().ToLowerInvariant();

        // האם יש תנועה באנגלית
        private static bool HasVowel(string s)
        {
            foreach (var ch in s)
            {
                if ("aeiouy".IndexOf(ch) >= 0) return true;
            }
            return false;
        }

        // האם שתי מילים מתחרזות לפי סיומות נפוצות (היגיון פשוט אך אפקטיבי)
        private static bool IsRhyme(string baseNorm, string candNorm)
        {
            if (string.IsNullOrEmpty(baseNorm) || string.IsNullOrEmpty(candNorm))
                return false;

            if (baseNorm == candNorm) return false;            // אותה מילה – לא
            if (candNorm.Contains(baseNorm)) return false;     // מכיל את המילה הבסיסית – לא

            // 1) התאמת 3 אותיות סיום עם תנועה – לדוגמה: ight/ake/all/ore/ing...
            var b3 = baseNorm.Length >= 3 ? baseNorm[^3..] : baseNorm;
            var c3 = candNorm.Length >= 3 ? candNorm[^3..] : candNorm;
            if (b3 == c3 && HasVowel(b3)) return true;

            // 2) התאמת 2 אותיות סיום מתוך whitelist של ביגרמות שנותנות חרוז אמיתי
            var rhymeBigrams = RhymeTimeRepository.rhymeBigrams; // סטטי למטה
            var b2 = baseNorm.Length >= 2 ? baseNorm[^2..] : baseNorm;
            var c2 = candNorm.Length >= 2 ? candNorm[^2..] : candNorm;

            if (b2 == c2 && rhymeBigrams.Contains(b2)) return true;

            return false;
        }

        // ביגרמות נפוצות שנותנות חריזה “טובה” (ניתן להרחיב/לכוונן)
        private static readonly HashSet<string> rhymeBigrams = new(StringComparer.Ordinal)
{
    // תנועות + עיצורים נפוצים
    "at","an","ap","am",
    "et","en","ed",
    "it","in","ip",
    "ot","op","og","om",
    "ut","up","um",

    // צמדי תנועות/צלילים נפוצים
    "ee","ea","oo","ou","ow","aw","ay","oy",
    "ar","er","ir","or","ur",

    // סיומות שכיחות כ-bigrams (משתלבות גם עם בדיקת 3 אותיות)
    "ll","ld","lt","nd","nt","st","sh","ch","ck","ng"
};

    }
}


