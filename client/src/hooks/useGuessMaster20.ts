import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGameData, submitProgress } from "@/lib/api"; // עדכני נתיב
import { QUERY_KEYS } from "@/lib/queryKeys";
import type { GuessMasterData, GuessMasterAskRequest, GuessMasterAskResponse } from "@/types/GuessMaster";

const GAME_ID = 14 as const;

export function useGuessMaster20() {
  const qc = useQueryClient();

  // GET data
  const dataQuery = useQuery<GuessMasterData>({
    queryKey: QUERY_KEYS.gameData(GAME_ID), // למשל: ["gameData", "guessmaster-20"]
    queryFn: () => fetchGameData(GAME_ID) as Promise<GuessMasterData>,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  // POST progress (שאלה/ניחוש) דרך submitProgress מה-api.ts
  const askMutation = useMutation<GuessMasterAskResponse, Error, GuessMasterAskRequest>({
    mutationFn: async (body) => {
      // מתאימים את גוף הבקשה לפורמט SubmitProgressPayload ש-api.ts מצפה לו:
      const payload: any = {
        gameID: GAME_ID,
        ...body, // sessionId, isGuess, questionText/questionId/guessWord
      };
      const res = await submitProgress(payload);
      return res as unknown as GuessMasterAskResponse;
    },
    onSuccess: (res) => {
      // עדכון ה-cache כדי שה-4 שאלות יתחלפו מיד בלי refetch
      qc.setQueryData<GuessMasterData>(QUERY_KEYS.gameData(GAME_ID), (prev) =>
        prev
          ? {
              ...prev,
              remainingTurns: res.remainingTurns,
              suggestedQuestions: res.nextSuggestedQuestions ?? prev.suggestedQuestions,
            }
          : prev
      );
    },
  });

  return { dataQuery, askMutation };
}
