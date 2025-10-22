export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? ""; 
// דוגמה: "" כשה-Next proxy/route handlers מטפלים בזה,
// או "https://localhost:7292" אם פונים ישירות לשרת החיצוני.

export const GUESSMASTER20_ENDPOINTS = {
  // מסמך המשחק ציין GET לנתוני פתיחה:
  // GET /api/v1/generalgame/guessmaster-20/data
  init: "/api/v1/generalgame/guessmaster-20/data",

  // ושאלות/ניחוש:
  // POST /api/v1/games/guessmaster-20/ask
  ask: "/api/v1/games/guessmaster-20/ask",
};
