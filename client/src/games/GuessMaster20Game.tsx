"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GameProps } from "@/components/common/GameLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGuessMaster20 as useGuessMaster20Real } from "@/hooks/useGuessMaster20";
import type {
  GuessMasterData,
  GuessMasterAskRequest,
  GuessMasterAskResponse,
} from "@/types/GuessMaster";

/* =============================
   Config: לעבוד על מוק / שרת
   ============================= */
const USE_MOCK = true;

/* =============================
   סוג לוג היסטוריה למסך
   ============================= */
type GuessTurn = {
  type: "question" | "guess";
  text: string;
  answer?: boolean | null;
  guessCorrect?: boolean | null;
};

/* =============================
   MOCK – מדמה שרת עם התמדה אמיתית
   ============================= */
function useGuessMaster20Mock() {
  const secretWordRef = useRef<string>("apple");
  const remainingRef = useRef<number>(20);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  const bank = [
    "Is it an animal?",
    "Is it a device?",
    "Is it edible?",
    "Is it bigger than a loaf of bread?",
    "Is it a fruit?",
    "Is it used daily?",
    "Is it found indoors?",
    "Is it electronic?",
    "Is it living?",
    "Is it man-made?",
    "Is it a color?",
    "Can you hold it in one hand?",
    "Is it round?",
    "Does it grow on trees?",
    "Is it sweet?",
    "Is it a proper noun?",
  ];

  const nextFour = () => [...bank].sort(() => Math.random() - 0.5).slice(0, 4);

  // מצב "שרת" שנשמר בין קריאות (לא מתאפס ברינדור)
  const serverState = useRef<GuessMasterData>({
    sessionId: sessionIdRef.current,
    title: "GuessMaster 20",
    maxTurns: 20,
    remainingTurns: remainingRef.current,
    suggestedQuestions: nextFour(),
  });

  // GET /data
  const dataQuery = useQuery<GuessMasterData>({
    queryKey: ["gm20", "data", "mock"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150));
      return { ...serverState.current };
    },
    // שלא יקרה refetch אוטומטי שמאפס UI
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  // POST /ask
  const askMutation = useMutation<GuessMasterAskResponse, Error, GuessMasterAskRequest>({
    mutationFn: async (req) => {
      await new Promise((r) => setTimeout(r, 300));

      if (remainingRef.current <= 0) {
        return {
          sessionId: sessionIdRef.current,
          yesNoAnswer: null,
          guessCorrect: null,
          remainingTurns: 0,
          nextSuggestedQuestions: [],
          gameOver: true,
          won: false,
        };
      }

      // כל פעולה צורכת תור
      remainingRef.current -= 1;

      if (req.isGuess) {
        const correct = req.guessWord?.trim().toLowerCase() === secretWordRef.current.toLowerCase();
        // סוף משחק תמיד בניחוש
        serverState.current = {
          ...serverState.current,
          remainingTurns: remainingRef.current,
          suggestedQuestions: [],
        };
        return {
          sessionId: sessionIdRef.current,
          yesNoAnswer: null,
          guessCorrect: correct,
          remainingTurns: remainingRef.current,
          nextSuggestedQuestions: [],
          gameOver: true,
          won: correct,
        };
      } else {
        // כן/לא "חצי חכם"
        const q = (req.questionText ?? "").toLowerCase();
        let yes = Math.random() > 0.5;
        if (q.includes("fruit")) yes = true;
        if (q.includes("animal")) yes = false;
        if (q.includes("sweet")) yes = true;
        if (q.includes("electronic")) yes = false;

        const over = remainingRef.current <= 0;
        serverState.current = {
          ...serverState.current,
          remainingTurns: remainingRef.current,
          suggestedQuestions: over ? [] : nextFour(),
        };

        return {
          sessionId: sessionIdRef.current,
          yesNoAnswer: yes,
          guessCorrect: null,
          remainingTurns: remainingRef.current,
          nextSuggestedQuestions: serverState.current.suggestedQuestions,
          gameOver: over,
          won: over ? false : null,
        };
      }
    },
    onSuccess: (res) => {
      // סנכרון "שרת"
      serverState.current = {
        ...serverState.current,
        remainingTurns: res.remainingTurns,
        suggestedQuestions: res.nextSuggestedQuestions,
      };
    },
  });

  return { dataQuery, askMutation };
}

/* =============================
   קומפוננטת המשחק
   ============================= */
export default function GuessMaster20Game({ onScoreChange, onGameOver, paused }: GameProps) {
  const { dataQuery, askMutation } = USE_MOCK ? useGuessMaster20Mock() : useGuessMaster20Real();

  const [history, setHistory] = useState<GuessTurn[]>([]);
  const [guessWord, setGuessWord] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null | undefined>(undefined);
  const [ended, setEnded] = useState(false);

  // “תורות שנותרו” — אופטימי + סנכרון מתגובה
  const [remaining, setRemaining] = useState<number>(20);

  // נבצע איפוס פעם אחת בלבד ב-mount/טעינה ראשונה
  const didInit = useRef(false);
  useEffect(() => {
    if (dataQuery.isSuccess && !didInit.current && dataQuery.data) {
      didInit.current = true;
      setHistory([]);
      setSelectedIdx(null);
      setSelectedAnswer(undefined);
      setEnded(false);
      setRemaining(dataQuery.data.remainingTurns);
      onScoreChange?.(0);
    }
  }, [dataQuery.isSuccess, dataQuery.data, onScoreChange]);

  const loading = dataQuery.isLoading;
  const error = dataQuery.isError || !dataQuery.data;
  const sessionId = dataQuery.data?.sessionId ?? "";
  const suggested = dataQuery.data?.suggestedQuestions ?? [];

  const disabledUI = paused || loading || askMutation.isPending || ended;

  const renderedHistory = useMemo(
    () =>
      history.map((h, i) => (
        <li key={i} className="flex items-center gap-3 opacity-70 cursor-not-allowed">
          <span className="text-sm opacity-70">#{i + 1}</span>
          <span className="flex-1">{h.text}</span>
          {h.type === "question" && (
            <span
              className={`px-2 py-1 rounded-lg text-sm ${
                h.answer ? "bg-emerald-600/80" : "bg-rose-600/80"
              }`}
            >
              {h.answer ? "כן" : "לא"}
            </span>
          )}
          {h.type === "guess" && (
            <span
              className={`px-2 py-1 rounded-lg text-sm ${
                h.guessCorrect ? "bg-emerald-600/80" : "bg-rose-600/80"
              }`}
            >
              {h.guessCorrect ? "ניחוש נכון!" : "ניחוש שגוי"}
            </span>
          )}
        </li>
      )),
    [history]
  );

  /* ------------ Handlers ------------ */

  async function askSuggested(questionText: string, questionId?: number) {
    if (!sessionId || disabledUI) return;

    // אופטימי: מורידים תור ברגע הלחיצה
    setRemaining((r) => Math.max(0, r - 1));

    setSelectedIdx(suggested.indexOf(questionText));
    setSelectedAnswer(undefined);

    try {
      const res = await askMutation.mutateAsync({
        sessionId,
        questionText,
        questionId,
        isGuess: false,
      });

      // סנכרון תורות מהתגובה
      setRemaining(res.remainingTurns);

      // שמירת היסטוריה
      setHistory((arr) => [
        ...arr,
        { type: "question", text: questionText, answer: res.yesNoAnswer ?? null },
      ]);

      // הצגת התשובה ליד השאלה
      setSelectedAnswer(res.yesNoAnswer ?? null);

      if (res.gameOver) {
        const score = (res.won ? 100 : 0) + Math.max(0, res.remainingTurns) * (res.won ? 5 : 0);
        setEnded(true);
        onScoreChange?.(score);
        onGameOver?.();
      } else {
        // אחרי הצגת תשובה – חוזרים ל-4 חדשות
        setTimeout(() => {
          setSelectedIdx(null);
          setSelectedAnswer(undefined);
        }, 300);
      }
    } catch {
      // אפשר להחזיר תור במקרה כשל רשת אם תרצי
    }
  }

  async function submitGuess() {
    if (!guessWord.trim() || !sessionId || disabledUI) return;

    // אופטימי: מורידים תור ומסיימים משחק ב-UI
    setRemaining((r) => Math.max(0, r - 1));
    setEnded(true);

    const word = guessWord.trim();
    setGuessWord("");

    try {
      const res = await askMutation.mutateAsync({
        sessionId,
        isGuess: true,
        guessWord: word,
      });

      setRemaining(res.remainingTurns);

      setHistory((arr) => [
        ...arr,
        { type: "guess", text: word, guessCorrect: res.guessCorrect ?? null },
      ]);

      const win = !!(res.won || res.guessCorrect);
      const score = (win ? 100 : 0) + Math.max(0, res.remainingTurns) * (win ? 5 : 0);
      onScoreChange?.(score);
      onGameOver?.();
    } catch {
      // אם תרצי להתיר ניסיון נוסף במקרה כשל — setEnded(false)
    }
  }

  /* ------------ UI ------------ */

  if (loading) return <div className="page-container">טוען…</div>;
  if (error) return <div className="page-container">שגיאה בטעינת הנתונים למשחק</div>;

  return (
    <div className={`page-container ${disabledUI && !ended ? "opacity-60 pointer-events-none" : ""}`} dir="rtl">
      {/* HUD */}
      <div className="game-hud mb-4 flex items-center gap-3">
        <div className="level-badge">תורות שנותרו: {remaining}</div>
        {ended && <div className="px-3 py-1 rounded-xl bg-white/10 border border-white/10">המשחק נגמר</div>}
      </div>

      <div className="grid gap-6">
        {/* היסטוריה */}
        <div className="panel">
          <h3 className="text-xl font-semibold text-indigo-400 mb-3">מה שאלת עד עכשיו</h3>
          {history.length === 0 ? (
            <div className="text-slate-300">עוד לא נשאלה אף שאלה.</div>
          ) : (
            <ul className="space-y-2">{renderedHistory}</ul>
          )}
        </div>

        {/* שאלות מוצעות / שאלה נבחרת */}
        <div className="panel space-y-4">
          <h3 className="text-xl font-semibold text-indigo-400">שאלות מוצעות</h3>

          {selectedIdx !== null ? (
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-medium">{suggested[selectedIdx]}</span>
                <span className="text-sm opacity-70">(שאלה נבחרת)</span>
              </div>
              <div className="mt-3">
                {selectedAnswer === undefined ? (
                  <div className="text-slate-300">ממתינים לתשובה…</div>
                ) : (
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-sm ${
                      selectedAnswer ? "bg-emerald-600/80" : "bg-rose-600/80"
                    }`}
                  >
                    {selectedAnswer ? "כן" : "לא"}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggested.slice(0, 4).map((q, i) => (
                <button
                  key={i}
                  className="btn-secondary"
                  onClick={() => askSuggested(q, i)}
                  disabled={disabledUI}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="h-px bg-white/10 my-2" />

          {/* ניחוש מילה – תמיד בתחתית; ניחוש מסיים משחק */}
          <h4 className="text-lg text-slate-200">ניחוש המילה</h4>
          <div className="flex gap-2">
            <input
              value={guessWord}
              onChange={(e) => setGuessWord(e.target.value)}
              placeholder="ניחוש המילה…"
              className="flex-1 rounded-xl px-4 py-2 bg-white/10 border border-white/10 outline-none"
              disabled={disabledUI}
            />
            <button
              className="btn-primary min-w-28"
              onClick={submitGuess}
              disabled={disabledUI || !guessWord.trim()}
            >
              נחשי 🎯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
