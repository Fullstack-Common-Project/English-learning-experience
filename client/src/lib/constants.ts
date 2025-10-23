
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7292/api/v1";

export const DEFAULT_FETCH_OPTIONS: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};




