import { GameId } from "./index";
export interface SubmitProgressPayload {
  playerName: string;
  score: number;
  time: number;
  roundsCompleted?: number;
  gameId: GameId;
}

export interface SubmitProgressResponse {
  status: "ok" | string;
  newRank?: number;
}
