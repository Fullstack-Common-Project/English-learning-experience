// src/hooks/useGuessMaster20.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getGuessMaster20Data,
  postGuessMaster20Ask,
  postGuessMaster20Progress,
  getGuessMaster20Leaderboard,
} from "@/lib/api.gm20";
import type {
  GuessMasterData,
  GuessMasterAskRequest,
  GuessMasterAskResponse,
} from "@/types/gamesTypes/GuessMaster";

const QK = {
  data: ["gm20", "data"] as const,
  leaderboard: ["gm20", "leaderboard"] as const,
};

export function useGuessMaster20() {
  const qc = useQueryClient();

  const dataQuery = useQuery<GuessMasterData>({
    queryKey: QK.data,
    queryFn: getGuessMaster20Data,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const askMutation = useMutation<GuessMasterAskResponse, Error, GuessMasterAskRequest>({
    mutationFn: postGuessMaster20Ask,
    onSuccess: (res, _vars, _ctx) => {
      // מעדכן את מטמון ["gm20","data"] לפי תשובת /ask – בלי invalidate/GET נוסף
      qc.setQueryData<GuessMasterData>(["gm20", "data"], (prev) => ({
        sessionId: res.sessionId,
        title: prev?.title ?? "GuessMaster 20",
        maxTurns: prev?.maxTurns ?? 20,
        remainingTurns: res.remainingTurns,
        suggestedQuestions: res.nextSuggestedQuestions ?? prev?.suggestedQuestions ?? [],
      }));
    },
  });

  const progressMutation = useMutation({
    mutationFn: postGuessMaster20Progress,
  });

  const leaderboardQuery = useQuery({
    queryKey: QK.leaderboard,
    queryFn: getGuessMaster20Leaderboard,
    enabled: false,
  });

  return { dataQuery, askMutation, progressMutation, leaderboardQuery };
}
