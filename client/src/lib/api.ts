import { API_BASE, DEFAULT_FETCH_OPTIONS } from "./constants";
import type {
  GameId,
  LeaderboardResponse,
  SubmitProgressPayload,
  SubmitProgressResponse,
} from "../types";
import type { GameResponseMap } from "../types";

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!res.ok) {
    const data = text ? JSON.parse(text) : {};
    throw new Error(data?.message || res.statusText);
  }
  return text ? JSON.parse(text) : ({} as T);
}

export async function fetchGameData<T extends GameId>(
  gameId: T
): Promise<GameResponseMap[T]> {
  const res = await fetch(`${API_BASE}/${gameId}/data`, {
    ...DEFAULT_FETCH_OPTIONS,
  });
  return handleResponse<GameResponseMap[T]>(res);
}

export async function fetchLeaderboard(
  gameId: GameId
): Promise<LeaderboardResponse> {
  const res = await fetch(`${API_BASE}/${gameId}/leaderboard`, {
    ...DEFAULT_FETCH_OPTIONS,
  });
  return handleResponse<LeaderboardResponse>(res);
}

export async function submitProgress(
  payload: SubmitProgressPayload
): Promise<SubmitProgressResponse> {
  const res = await fetch(`${API_BASE}/${payload.gameID}/progress`, {
    method: "POST",
    ...DEFAULT_FETCH_OPTIONS,
    body: JSON.stringify(payload),
  });
  return handleResponse<SubmitProgressResponse>(res);
}
