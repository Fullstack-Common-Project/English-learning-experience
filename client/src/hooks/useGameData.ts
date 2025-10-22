import { useQuery } from "@tanstack/react-query";
import { fetchGameData } from "../lib/api";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { GameId } from "../types";
import type { GameResponseMap } from "../types";

export function useGameData<T extends GameId>(
  gameId: T,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery<GameResponseMap[T]>({
    queryKey: QUERY_KEYS.gameData(gameId),
    queryFn: () => fetchGameData(gameId),
    staleTime: options?.staleTime ?? 1000 * 60 * 2,
    enabled: options?.enabled ?? true,
  });
}
