export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1/GeneralGame/";

export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};
