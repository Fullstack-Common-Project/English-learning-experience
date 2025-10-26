import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPlatformGames } from "../lib/api";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { Game } from "../types";

export function usePlatformGames() {
  return useQuery<Game[]>({
    queryKey: QUERY_KEYS.platformGames,
    queryFn:async()=>fetchPlatformGames() ,
    staleTime: Infinity,
    refetchOnWindowFocus: false, 
  });
}
