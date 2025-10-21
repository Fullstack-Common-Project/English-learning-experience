import type { GameId } from "../types";
export const QUERY_KEYS = {
  gameData: (gameId: GameId) => ["gameData", gameId],
  leaderboard: (gameId: GameId) => ["leaderboard", gameId],
  submitProgress: (gameId: GameId) => ["submitProgress", gameId],
};
