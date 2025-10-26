import { GameResponseBase } from "../index";


export type GuessMasterData = {
  sessionId: string;
  title: string;
  maxTurns: number;
  remainingTurns: number;
  suggestedQuestions: string[];
};

export type GuessMasterAskRequest = {
  sessionId: string;
  isGuess?: boolean;
  questionText?: string;
  questionId?: number;
  guessWord?: string;
};

export type GuessMasterAskResponse = {
  sessionId: string;
  yesNoAnswer?: boolean | null;
  guessCorrect?: boolean | null;
  remainingTurns: number;
  nextSuggestedQuestions: string[];
  gameOver: boolean;
  won?: boolean | null;
};
export interface GuessMasterResponse
  extends GameResponseBase<14, GuessMasterData> {}
