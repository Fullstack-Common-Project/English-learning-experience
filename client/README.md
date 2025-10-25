# English-learning-experience
game ideas to help learn English language as a second language

# English Learning Experience – Client

## מבנה הפרויקט

```
DESIGN.md
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
README.md
tailwind.config.mjs
tsconfig.json
tsconfig.tsbuildinfo
public/
  file.svg
  globe.svg
  next.svg
  vercel.svg
  window.svg
src/
  app/
    favicon.ico
    globals.css
    layout.tsx
    page.tsx
    (auth)/
      login/
        page.tsx
      sign-up/
        page.tsx
    api/
      v1/
        games/
          [gameId]/
        users/
    games/
      grammar-guru/
        page.tsx
      mini-wordle/
        page.tsx
      opposite-quest/
        page.tsx
      picpick/
        page.tsx
      sentence-shuffle/
        page.tsx
    leaderboard/
      [gameId]/
        page.tsx
  components/
    common/
      Footer.tsx
      GameLayout.tsx
      Header.tsx
    hud/
      audioToggle.tsx
      countdown3_2_1.tsx
      levelBadge.tsx
      pauseOverlay.tsx
      progressBar.tsx
    leaderboard/
      ChoiceButton.tsx
      GameOverModal.tsx
      HelpScreen.tsx
      Leaderboard.tsx
      ProgressBar.tsx
      ScoreDisplay.tsx
      Timer.tsx
    ui/
      Button.tsx
      Card.tsx
      Modal.tsx
  games/
    DoubleVisionGame.tsx
    GrammarGuruGame.tsx
    GuessMaster20Game.tsx
    LetterChaosGame.tsx
    MemoryAntonymsGame.tsx
    MemorySynonymsGame.tsx
    MiniWordleGame.tsx
    OppositeQuestGame.tsx
    PicPickGame.tsx
    RevealItGame.tsx
    SentenceShuffleGame.tsx
    TwinWordsGame.tsx
    WordSorterGame.tsx
    WordWiseFlashGame.tsx
    mini-wordle/
      Board.tsx
      Keyboard.tsx
      MiniWordle.tsx
      Tile.tsx
  hooks/
    useGameData.ts
    useGameState.ts
    useGameTimer.ts
    useLeaderboard.ts
    useSubmitProgress.ts
  lib/
    animations.ts
    api.ts
    constants.ts
    queryKeys.ts
    scoring.ts
  providers/
    QueryProvider.tsx
  store/
    gameStore.tsx
    Providers.tsx
    userSlice.tsx
  styles/
    globals.css
  types/
    ContextClues.ts
    DoubleVision.ts
    GrammarGuru.ts
    GuessMaster.ts
    index.ts
    Leaderboard.ts
    LetterChaos.ts
    MemoryAntonyms.ts
    MemorySynonyms.ts
    MiniWordle.ts
    OppositeQuest.ts
    OppositeQuestData.tsx
    PhraseCraze.ts
    PicPick.ts
    PictureHangman.ts
    RhymeTime.ts
    SentenceShuffle.ts
    SubmitProgress.ts
    TwinWords.ts
    WordSorter.ts
    WordwiseFlash.ts
```

> מבנה זה מציג את קבצי הליבה, תיקיות המשחקים, קומפוננטות, לוגיקה, סטור, וסוגי נתונים.

# מדריך הוספת משחק חדש (Frontend)

> **מטרה:** לאפשר לכל מפתחת (גם מחוץ לצוות) להוסיף משחק חדש לאתר באופן עקבי ובטוח, בלי לשבור את התשתית המשותפת.

---

## 0) לפני שמתחילים
- הפרויקט בנוי על **Next.js (App Router) + React 18**.
- קיימת מסגרת משותפת: `GameLayout`, רכיבי HUD/דיאלוגים, Hooks ל־Timer/Leaderboard וכו’.
- **אסור** לשנות חוזים כלליים/Endpoints/רכיבים משותפים בלי תיאום עם Core.
- **Tailwind v4**: משתמשים ב־utilities וב־CSS Variables (tokens) בלבד; לא עושים `@apply` על מחלקות מותאמות; צבעים/רקעים דרך משתנים; שמירה על מחלקות קיימות (למשל `page-container`, `btn-primary` וכו’).

---

## 1) מה יוצרים? (TL;DR)
1. עמוד משחק: `src/app/games/<game-id>/page.tsx`
2. קומפוננטת משחק: `src/games/<GameName>/<GameName>Game.tsx`
3. טיפוסים מקומיים (רשות): `src/games/<GameName>/types.ts`
4. בדיקות/סטוריז (מומלץ):  
   `src/games/<GameName>/<GameName>Game.test.tsx`  
   `src/games/<GameName>/<GameName>Game.stories.tsx`

> `<game-id>` = ה־slug ב־URL (למשל `picpick`), `<GameName>` = שם קומפוננטה בפסקל־קייס (למשל `PicPick`).

---

## 2) החוזה שחייבים לכבד (Contract)
כל משחק הוא קומפוננטת React שמקבלת:
```ts
export interface GameComponentProps {
  playerName: string;
  onGameEnd: (score: number, timeMs: number) => void;
}
```

דוגמה:
```tsx
import { GameComponentProps } from "@/types/game";

export default function PicPickGame({ playerName, onGameEnd }: GameComponentProps) {
  // ... לוגיקה
  // onGameEnd(finalScore, elapsedMs) בסיום
  return (/* UI */);
}
```

> אין לשנות שמות/טיפוסים. צריך מידע נוסף? הביאו מה־API של המשחק שלכם.

---

## 3) הזרימה המנוהלת (Managed by GameLayout)
`GameLayout` מטפל במסכים: **Welcome → Help → Game → Results/Leaderboard**.  
אתן מממשות רק את שלב **Game** (ועיצוב תוכן Help דרך `helpSteps`).

---

## 4) יצירת עמוד המשחק (Next.js)
```tsx
// src/app/games/picpick/page.tsx
import GameLayout from "@/components/common/GameLayout";
import PicPickGame from "@/games/PicPick/PicPickGame";

export default function Page() {
  return (
    <GameLayout
      gameId="picpick"
      title="PicPick"
      helpSteps={[
        { title: "איך משחקים", text: "בחרי את המשפט שמתאים לתמונה", img: "/help/picpick-1.png" },
        { title: "טיפ", text: "עני מהר יותר → ניקוד גבוה יותר" }
      ]}
      renderGame={(props) => <PicPickGame {...props} />}
    />
  );
}
```

- `gameId` חייב להתאים לנתיבי ה־API שלכם.
- `helpSteps` מגדיר את תוכן מסך ה־Help (מודאל פנימי).
- `renderGame` מקבל `GameComponentProps`.

---

## 5) שלד קומפוננטת משחק (מינימום עובד)
```tsx
// src/games/PicPick/PicPickGame.tsx
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { GameComponentProps } from "@/types/game";
import { getGameData, postProgress } from "@/lib/api";
import GameHUD from "@/components/hud/GameHUD";
import Timer from "@/components/hud/Timer";
import ScoreCounter from "@/components/hud/ScoreCounter";
import PrimaryButton from "@/components/controls/PrimaryButton";
import { useRef, useState } from "react";

type PicPickRound = {
  imageUrl: string;
  sentences: string[];
  correctIndex: number;
};
type PicPickData = {
  rounds: PicPickRound[];
  timeLimitMs: number;
  baseScorePerCorrect: number;
};

export default function PicPickGame({ playerName, onGameEnd }: GameComponentProps) {
  const [score, setScore] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const elapsedRef = useRef(0);

  // 1) נתונים
  const { data, isLoading, isError } = useQuery<PicPickData>({
    queryKey: ["game-data", "picpick", playerName],
    queryFn: () => getGameData("picpick"), // GET /api/v1/games/picpick/data
  });

  // 2) שמירת התקדמות
  const { mutateAsync: saveProgress } = useMutation({
    mutationFn: (payload: { name: string; score: number; timeMs: number }) =>
      postProgress("picpick", payload), // POST /api/v1/games/picpick/progress
  });

  if (isLoading) return <div className="page-container">טוען…</div>;
  if (isError || !data) return <div className="page-container">שגיאה בטעינת המשחק</div>;

  const round = data.rounds[roundIndex];

  function handleAnswer(i: number) {
    const correct = i === round.correctIndex;
    if (correct) setScore((s) => s + data.baseScorePerCorrect);

    const next = roundIndex + 1;
    if (next < data.rounds.length) setRoundIndex(next);
    else finish();
  }

  async function finish() {
    const timeMs = elapsedRef.current;
    await saveProgress({ name: playerName, score, timeMs });
    onGameEnd(score, timeMs); // חובה!
  }

  return (
    <div className="page-container">
      <GameHUD
        leftSlot={<ScoreCounter value={score} />}
        rightSlot={
          <Timer
            mode="down"
            initialMs={data.timeLimitMs}
            onTick={(ms) => { elapsedRef.current = data.timeLimitMs - ms; }}
            onComplete={finish}
          />
        }
      />
      <div className="card grid gap-4">
        <img src={round.imageUrl} alt="תמונה לשאלה" className="rounded-2xl" />
        <div className="grid md:grid-cols-2 gap-3">
          {round.sentences.map((s, i) => (
            <PrimaryButton key={i} onClick={() => handleAnswer(i)}>
              {s}
            </PrimaryButton>
          ))}
        </div>
      </div>
    </div>
  );
}
```

> משחקים שאינם זקוקים ל־API יכולים לעבוד עם נתוני דמו לוקאליים.

---

## 6) באילו רכיבים להשתמש
- **HUD**: `GameHUD`, `Timer`, `ScoreCounter`, `LivesIndicator` (אם צריך), `LevelBadge`.
- **בקרה**: `PrimaryButton`, `IconButton`, `AudioToggle`.
- **דיאלוגים**: `HelpDialog` (דרך `GameLayout`), `ResultsDialog` מוצג אחרי `onGameEnd`.
- **נתונים**: `LeaderboardTable` במסך Leaderboard המשותף.

> לא ממציאים טיימר/כפתורים חדשים – משתמשים בקיימים לשמירת קונסיסטנטיות.

---

## 7) API – מה פתוח לכם
לכל משחק:
- `GET /api/v1/games/{gameId}/data` – להבאת נתוני משחק/סשן
- `POST /api/v1/games/{gameId}/progress` – שמירת שם/ניקוד/זמן
- `GET /api/v1/games/{gameId}/leaderboard` – טבלת מובילים

בפרונט:
```ts
// src/lib/api.ts
export async function getGameData(gameId: string) { /* ... */ }
export async function postProgress(gameId: string, body: { name: string; score: number; timeMs: number }) { /* ... */ }
export async function getLeaderboard(gameId: string) { /* ... */ }
```

> אין לשנות מסלולים/פורמט תגובות. צריך shape ייחודי? הגדירו טיפוסים לוקאליים ומפו אותם במימוש שלכם, בתיאום עם ה־backend.

---

## 8) עיצוב וקונסיסטנטיות
- Tailwind utilities בלבד + tokens מ־`globals.css`/`tokens.css`.
- לא עושים `@apply` למחלקות מותאמות. כן מותר `rounded-2xl`, `grid`, `gap-4`, `p-6` וכו’.
- צבעים/רקעים: דרך CSS Variables (למשל `bg-[var(--color-surface)]`).
- RTL כבר פעיל גלובלית. לדאוג ל־`alt` לתמונות ונגישות מקלדת.

---

## 9) סיום משחק – חובה!
- בסיום: `onGameEnd(score, timeMs)` (ולפני כן מומלץ `postProgress`).
- אחרי `onGameEnd` מתקבל מסך תוצאות אוטומטי + קישורים ל־Leaderboard/Menu/Play Again.

---

## 10) הוספה למסך “בחירת משחק”
ערכו את `gamesCatalog`:
```ts
// src/app/(home)/games.config.ts
export const gamesCatalog = [
  // ...
  {
    id: "picpick",
    title: "PicPick",
    description: "התאמת משפט לתמונה",
    thumbnail: "/thumbs/picpick.png",
    href: "/games/picpick"
  }
];
```

---

## 11) צ’ק־ליסט מהיר
- [ ] `src/app/games/<game-id>/page.tsx` עם `GameLayout` ו־`helpSteps`
- [ ] `src/games/<GameName>/<GameName>Game.tsx` שמקבל `GameComponentProps`
- [ ] קריאת `onGameEnd(score, timeMs)` בטוחה
- [ ] שימוש ב־`getGameData`/`postProgress` לפי צורך
- [ ] בלי שינוי חוזים/Endpoints גלובליים
- [ ] Tailwind utilities + tokens; בלי `@apply` מותאם
- [ ] הוספה ל־`gamesCatalog`
- [ ] ESLint/TS ירוקים; טקסטים RTL; alt לתמונות

---

## 12) תבנית להעתקה (Skeleton)
```tsx
// src/app/games/<slug>/page.tsx
import GameLayout from "@/components/common/GameLayout";
import XxxGame from "@/games/Xxx/XxxGame";

export default function Page() {
  return (
    <GameLayout
      gameId="<slug>"
      title="Xxx"
      helpSteps={[{ title: "איך משחקים", text: "הסבר קצר", img: "/help/xxx-1.png" }]}
      renderGame={(props) => <XxxGame {...props} />}
    />
  );
}
```
```tsx
// src/games/Xxx/XxxGame.tsx
"use client";
import { GameComponentProps } from "@/types/game";
import GameHUD from "@/components/hud/GameHUD";
import Timer from "@/components/hud/Timer";
import ScoreCounter from "@/components/hud/ScoreCounter";
import PrimaryButton from "@/components/controls/PrimaryButton";
import { useState, useRef } from "react";
import { postProgress } from "@/lib/api";

export default function XxxGame({ playerName, onGameEnd }: GameComponentProps) {
  const [score, setScore] = useState(0);
  const elapsedRef = useRef(0);

  function finish() {
    postProgress("xxx", { name: playerName, score, timeMs: elapsedRef.current })
      .finally(() => onGameEnd(score, elapsedRef.current));
  }

  return (
    <div className="page-container">
      <GameHUD
        leftSlot={<ScoreCounter value={score} />}
        rightSlot={
          <Timer
            mode="down"
            initialMs={60000}
            onTick={(ms) => (elapsedRef.current = 60000 - ms)}
            onComplete={finish}
          />
        }
      />
      <div className="card grid gap-4">
        {/* המשחק שלך כאן */}
        <PrimaryButton onClick={() => setScore((s) => s + 10)}>+10</PrimaryButton>
        <PrimaryButton onClick={finish}>סיום</PrimaryButton>
      </div>
    </div>
  );
}
```

---

## 13) נפילות נפוצות
- ❌ שכחת `onGameEnd` → אין תוצאות/Leaderboard.
- ❌ שינוי `GameComponentProps` → המעטפת נשברת.
- ❌ צבעים/`@apply` מותאם → שבירת קו עיצוב וכללי Tailwind v4.
- ❌ `gameId` לא תואם לנתיבי ה־API → שגיאות שרשרת.
- ❌ חוסר נגישות (אין alt/מיקוד) → נפסל ב־QA.

---

## 14) תמיכה
- צריך שדה ייחודי? הגדירו טיפוסים לוקאליים בקובץ המשחק.
- שינוי פרוטוקול/סקימה – רק בתיאום Core, ומומלץ מאחורי `/v2`.
- רוצים דוגמה למשחק ספציפי? בקשו שלד (Opposite Quest / Grammar Guru / MiniWordle וכו’).
