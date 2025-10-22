export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? ""; 

export const GUESSMASTER20_ENDPOINTS = {
  init: "/api/v1/generalgame/guessmaster-20/data",
  ask: "/api/v1/games/guessmaster-20/ask",
};
