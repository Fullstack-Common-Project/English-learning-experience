import { API_BASE, getFetchOptions } from "./constants";
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
  const res = await fetch(`${API_BASE}/GeneralGame/${gameId}/data`, {
    ...getFetchOptions(),
  });
  return handleResponse<GameResponseMap[T]>(res);
}

export async function fetchLeaderboard(
  gameId: GameId
): Promise<LeaderboardResponse> {
  const res = await fetch(`${API_BASE}/GeneralGame/${gameId}/leaderboard`, {
    ...getFetchOptions(),
  });
  return handleResponse<LeaderboardResponse>(res);
}

export async function submitProgress(
  payload: SubmitProgressPayload
): Promise<SubmitProgressResponse> {
  const res = await fetch(`${API_BASE}/GeneralGame/${payload.gameId}/progress`, {
    method: "POST",
    ...getFetchOptions(),
    body: JSON.stringify(payload),
  });
  return handleResponse<SubmitProgressResponse>(res);
}

export async function fetchPlatformGames() {
  const res = await fetch(`${API_BASE}/Game/GetAll`, {
    headers:{ "Content-Type": "application/json" }
  });
  const result = await res.json();
  console.log("Fetched platform games:", result);
  if (!res.ok) throw new Error(
    `Failed to fetch games ${result?.message || result.statusText}`
  );
  return result.data; 
}