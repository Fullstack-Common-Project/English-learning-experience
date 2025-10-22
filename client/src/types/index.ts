export interface GameComponents{
    playerName:string;
    onGameEnd: (score:number,timeMs:number)=>void;
}

export type GuessMasterData = {
  sessionId: string;
  title: string;
  maxTurns: number;
  remainingTurns: number;
  suggestedQuestions: string[];
};

export type GuessMasterAskRequest = {
  sessionId: string;
  questionText?: string;
  questionId?: number;
  isGuess?: boolean;
  guessWord?: string;
};

export type GuessMasterAskResponse = {
  sessionId: string;
  yesNoAnswer?: boolean | null;  // null אם זה ניחוש
  guessCorrect?: boolean | null; // null אם זו שאלה
  remainingTurns: number;
  nextSuggestedQuestions: string[];
  gameOver: boolean;
  won?: boolean | null;
};