// src/hooks/useGuessMaster20.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuessMaster20Data, postGuessMaster20Ask } from "@/lib/api.gm20";
import type {
  GuessMasterData,
  GuessMasterAskRequest,
  GuessMasterAskResponse,
} from "@/types/GuessMaster";

const QK = {
  data: ["gm20", "data"] as const,
};

export function useGuessMaster20() {
  const qc = useQueryClient();

  const dataQuery = useQuery<GuessMasterData>({
    queryKey: QK.data,
    queryFn: getGuessMaster20Data,
    staleTime: 0,
  });

  const askMutation = useMutation<GuessMasterAskResponse, Error, GuessMasterAskRequest>({
    mutationFn: postGuessMaster20Ask,
    onSuccess: () => {
      // רענון נתוני המשחק (turns/suggested)
      qc.invalidateQueries({ queryKey: QK.data });
    },
  });

  return { dataQuery, askMutation };
}
