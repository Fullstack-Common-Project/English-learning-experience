import { API_BASE, GUESSMASTER20_ENDPOINTS } from "./constants";
import type {
  GuessMasterData,
  GuessMasterAskRequest,
  GuessMasterAskResponse,
} from "@/types";

// עטיפה נוחה ל-fetch עם JSON (אם כבר יש פונקציה דומה בקובץ – השתמשי בה)
async function requestJSON<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`);
  }
  return (await res.json()) as T;
}

/**
 * יצירת סשן וקבלת נתוני פתיחה של GuessMaster 20
 * GET /api/v1/generalgame/guessmaster-20/data
 */
export async function gm20GetInit(): Promise<GuessMasterData> {
  const url = `${API_BASE}${GUESSMASTER20_ENDPOINTS.init}`;
  return requestJSON<GuessMasterData>(url, { method: "GET" });
}

/**
 * שליחת שאלה/ניחוש לשרת
 * POST /api/v1/games/guessmaster-20/ask
 */
export async function gm20Ask(
  body: GuessMasterAskRequest
): Promise<GuessMasterAskResponse> {
  const url = `${API_BASE}${GUESSMASTER20_ENDPOINTS.ask}`;
  return requestJSON<GuessMasterAskResponse>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
