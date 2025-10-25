// src/types/GuessMaster.ts

// נתוני פתיחה / מצב משחק
export interface GuessMasterData {
  sessionId: string;            // Guid בצד שרת - כאן כמחרוזת
  title: string;                // "GuessMaster 20"
  maxTurns: number;
  remainingTurns: number;
  suggestedQuestions: string[];
}

// בקשת מהלך: שאלה או ניחוש
export interface GuessMasterAskRequest {
  sessionId: string;            // חובה
  questionText?: string;        // אופציונלי (אם זו שאלה חופשית)
  questionId?: number;          // אופציונלי (אם זו שאלה ממאגר)
  isGuess?: boolean;            // true אם זה ניחוש
  guessWord?: string;           // המילה המנוחשת
}

// תגובת מהלך
export interface GuessMasterAskResponse {
  sessionId: string;
  yesNoAnswer?: boolean | null;       // null אם זה ניחוש
  guessCorrect?: boolean | null;      // null אם זו שאלה
  remainingTurns: number;
  nextSuggestedQuestions: string[];
  gameOver: boolean;
  won?: boolean | null;
}

// לצורך הייבוא ב- types/index.ts
export type GuessMasterResponse = GuessMasterData;
