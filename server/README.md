# 🕹️ הוספת משחק חדש לשרת – מדריך למפתחת

## 0️⃣ לפני שמתחילים
הפרויקט בנוי על **ASP.NET Core 8**.  
כל משחק חדש מתווסף כיישות עצמאית, **ללא שינוי חוזים קיימים** (`Interfaces`, `DTOs`, `API Endpoints`) – אלא אם יש תיאום מראש עם הצוות.  

### כל משחק חדש צריך:
- 🧩 Repository ייעודי שמממש את `IGeneralGameRepository`  
- ⚙️ רישום ב־`Program.cs` תחת `IGeneralGameRepository`  
- 💾 נתונים מותאמים ב־DB (אם המשחק דורש נתונים חדשים)

---

## 1️⃣ מה יוצרים (סיכום קצר)

| רכיב | מיקום | תיאור |
|------|--------|--------|
| Repository חדש | `Repositories/Classes/Games/<GameName>Repository.cs` | מממש את `IGeneralGameRepository` |
| רישום ב־DI | `Program.cs` → `builder.Services.AddScoped<IGeneralGameRepository, <GameName>Repository>();` | חיבור ה־Repository למערכת |
| פונקציית GetData | בתוך ה־Repository | מחזירה את הנתונים הדרושים למשחק דרך ה־API |
| עדכון DB | אם נדרש | הוספת נתונים רלוונטיים לטבלאות הקיימות או יצירת טבלה חדשה |

---

## 2️⃣ החוזה (Contract) שחייבים לכבד

כל משחק חדש **מממש** את הממשק הבא:

```csharp
public interface IGeneralGameRepository
{
    string GameName { get; }              // שם המשחק (חייב להיות ייחודי)
    Task<GameInitialData?> GetData();     // מחזיר נתוני התחלה עבור המשחק
}
```

### דוגמה למימוש בסיסי:
```csharp
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class ExampleGameRepository : IGeneralGameRepository
    {
        public string GameName => "Example Game";

        public async Task<GameInitialData?> GetData()
        {
            // לוגיקה לשליפת נתונים מה־DB
            return new GameInitialData(); // מחזיר נתוני התחלה ריקים לדוגמה
        }
    }
}
```

---

## 3️⃣ רישום המשחק ב־Dependency Injection

כדי שהשרת יכיר את המשחק החדש, יש לרשום את ה־Repository החדש ב־`Program.cs`:

```csharp
builder.Services.AddScoped<IGeneralGameRepository, ExampleGameRepository>();
```

---

## 4️⃣ מבנה נתונים (Game Data)

הפונקציה `GetData()` מחזירה אובייקט שנגזר מהמחלקה `GameInitialData`.  
המחלקה `GameInitialData` עצמה **ריקה** — היא משמשת כ־**Base Class** אחיד לכל סוגי הנתונים של המשחקים, כדי לשמור על אחידות ולמנוע כפילויות.

כל משחק יוצר מחלקת נתונים משלו שיורשת מ־`GameInitialData` ומכילה את השדות הדרושים רק לו.

### דוגמה:
```csharp
// מחלקת בסיס ריקה – משותפת לכל המשחקים
public class GameInitialData
{
    // אין כאן שדות – רק בסיס אחיד למורשים
}
```

```csharp
// דוגמה למימוש עבור משחק Picture Hangman
public class PictureHangmanData : GameInitialData
{
    public string TargetWord { get; set; }   // המילה שצריך לנחש
    public string ImageUrl { get; set; }     // כתובת התמונה שתיחשף בהדרגה
}
```

---

## 5️⃣ עדכון טבלאות (אם נדרש)

אם המשחק שלך דורש נתונים חדשים, יש שתי אפשרויות:

### 🧩 הוספת נתונים לטבלאות קיימות
לדוגמה:
- הוספת מילים לטבלת `Words`
- הוספת תמונות לטבלת `Images`

### 🏗️ יצירת טבלה חדשה
אם אין טבלה מתאימה:
1. צור Entity חדש בתיקייה `Models/Entities`
2. עדכן את `AppDbContext` עם `DbSet` חדש
3. הרץ פקודה לעדכון הסכימה:
   ```bash
   dotnet ef migrations add <MigrationName>
   dotnet ef database update
   ```

---

## 6️⃣ בדיקות מהירות (Checklist)

✅ יצרת Repository חדש תחת `Repositories/Classes/Games`  
✅ מימשת את `IGeneralGameRepository` עם שם ייחודי  
✅ רשמת את ה־Repository ב־`Program.cs`  
✅ החזרת נתונים תקינים דרך `GetData()`  
✅ עדכנת את ה־DB (אם נדרש)  
✅ בדקת את ה־API דרך Swagger או Postman  

---

## 7️⃣ דוגמה מלאה – הוספת משחק “Opposite Quest”

### 1. יצירת Repository חדש
```csharp
using EnglishGamesPlatform.Backend.Models.DTOs;
using EnglishGamesPlatform.Backend.Repositories.Interfaces;

namespace EnglishGamesPlatform.Backend.Repositories.Classes.Games
{
    public class OppositeQuestRepository : IGeneralGameRepository
    {
        public string GameName => "Opposite Quest";

        private readonly IWordRepository _wordRepository;

        public OppositeQuestRepository(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<GameInitialData?> GetData()
        {
            var pairs = await _wordRepository.GetRandomOppositePairsAsync();

            var data = new OppositeQuestData
            {
                Title = "Opposite Quest",
                Questions = pairs.Select(pair => new Question
                {
                    Text = $"What is the opposite of {pair.FirstWord.WordText}?",
                    Options = new List<string>
                    {
                        pair.SecondWord.WordText,
                        "Option 2",
                        "Option 3",
                        "Option 4"
                    },
                    CorrectIndex = 0
                }).ToList()
            };

            return data;
        }
    }
}
```

### 2. רישום המשחק ב־Program.cs
```csharp
builder.Services.AddScoped<IGeneralGameRepository, OppositeQuestRepository>();
```

### 3. בדיקת ה־API
בדקי את הנתונים דרך Swagger:

```
GET /api/v1/generalgame/{gameId}/data
```

---

## 8️⃣ נפילות נפוצות (איך לא ליפול)

❌ שכחת לרשום את ה־Repository ב־`Program.cs`  
❌ שם המשחק (`GameName`) אינו ייחודי  
❌ החזרת נתונים ריקים או לא תקינים מ־`GetData()`  
❌ לא עדכנת את ה־DB עם נתונים רלוונטיים  

---

## 9️⃣ שאלות ותמיכה

- צריך להוסיף שדה חדש ל־DTO? → עדכני את ה־DTO המקומי בלבד.  
- שינוי API או חוזה? → רק בתיאום עם צוות הפרונט.  
- רוצה דוגמה ספציפית למשחק שלך? → אפשר לבקש שלד מוכן (Template).  

---

### ✅ זהו!
אם תעקבי אחרי המדריך הזה – המשחק שלך יתחבר לשרת בצורה חלקה, יישאר אחיד עם שאר המערכת, ויעבוד עם כל ה־API המשותף 🚀  
