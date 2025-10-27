import { GameId } from "./index";
export interface LeaderboardEntry {
  rank: number;
  userName: string;
  score: number;
  time: number;
}

export interface LeaderboardResponse {
  data: {
    gameId: GameId;
    leaderboards: LeaderboardEntry[];
  }
}
