// api.gm20.ts

const API_BASE = "https://localhost:7292/api/v1";
const GAME_ID = 14; // <-- מספרי. זה ה-ID של המשחק "GuessMaster 20" אצלכם

// 1) DATA — היה /GeneralGame/Guessmaster-20/data (שגוי)
//    צריך להיות מספר: /GeneralGame/14/data
export async function getGuessMaster20Data() {
  const res = await fetch(`${API_BASE}/GeneralGame/${GAME_ID}/data`, {
    method: "GET"
  });
  if (!res.ok) throw new Error(`Failed to load GM20 data (${res.status})`);
  const json = await res.json();
  // אם השרת עוטף תשובות ב-Response<T> (לפי הקונטרולר הכללי), שלפי הקוד בדרך כלל זה { isSuccess, data, ... }
  return json.data ?? json; 
}

// 2) ASK — ודאי שהנתיב הוא זה של בקר המשחק הייעודי (לא GeneralGame):
//    POST /api/v1/games/guessmaster-20/ask
export async function postGuessMaster20Ask(body: {
  sessionId: string;
  questionText?: string;
  questionId?: number;
  isGuess?: boolean;
  guessWord?: string;
}) {
  const res = await fetch(`${API_BASE}/games/guessmaster-20/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`ASK failed (${res.status}) ${text}`);
  }
  return res.json();
}
