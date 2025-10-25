import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitProgress } from "../lib/api";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { SubmitProgressPayload, SubmitProgressResponse } from "../types";

export function useSubmitProgress() {
  const qc = useQueryClient();

  return useMutation<SubmitProgressResponse, Error, SubmitProgressPayload>({
    mutationFn: (payload) => submitProgress(payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.leaderboard(variables.gameID) });
    },
  });
}
