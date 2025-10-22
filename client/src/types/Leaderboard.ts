import { GameId } from "./index";
export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  time: number;
}

export interface LeaderboardResponse {
  gameId: GameId;
  leaderboard: LeaderboardEntry[];
}
