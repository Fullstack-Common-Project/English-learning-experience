import { GameId } from "./index";
export interface SubmitProgressPayload {
  gameID: GameId,
  userID: number,
  score: number,
  time: number,
  rounds: number

}

export interface SubmitProgressResponse {
  isLeadingPlayer: "ok" | boolean;
  rank?: number;
}
