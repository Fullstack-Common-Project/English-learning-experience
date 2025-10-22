import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "../lib/api";
import { QUERY_KEYS } from "@/lib/queryKeys";
import type { GameId, LeaderboardResponse } from "../types";

export function useLeaderboard(
  gameId: GameId,
  options?: { refetchInterval?: number; enabled?: boolean }
) {
  return useQuery<LeaderboardResponse>({
    queryKey: QUERY_KEYS.leaderboard(gameId),
    queryFn: () => fetchLeaderboard(gameId),
    refetchInterval: options?.refetchInterval ?? 0,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 1,
  });
}
