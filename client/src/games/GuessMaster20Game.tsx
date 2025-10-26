"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GameProps } from "@/components/common/GameLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGuessMaster20 as useGuessMaster20Real } from "@/hooks/useGuessMaster20";
import { submitProgress } from "@/lib/api";
import type {
  GuessMasterData,
  GuessMasterAskRequest,
  GuessMasterAskResponse,
} from "@/types/gamesTypes/GuessMaster";

const USE_MOCK = true;

type GuessTurn = {
  type: "question" | "guess";
  text: string;
  answer?: boolean | null;
  guessCorrect?: boolean | null;
};

export function useGuessMaster20Mock() {
  const qc = useQueryClient();

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

  // Persisted "server" state across renders
  const serverState = useRef<GuessMasterData>({
    sessionId: sessionIdRef.current,
    title: "GuessMaster 20",
    maxTurns: 20,
    remainingTurns: remainingRef.current,
    suggestedQuestions: nextFour(),
  });

  const dataKey = ["gm20", "data", "mock"] as const;

  // GET /data
  const dataQuery = useQuery<GuessMasterData>({
    queryKey: dataKey,
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150));
      return { ...serverState.current };
    },
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

      // consume a turn
      remainingRef.current -= 1;

      if (req.isGuess) {
        const correct =
          req.guessWord?.trim().toLowerCase() === secretWordRef.current.toLowerCase();

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
          gameOver: true, // guessing ends the game
          won: correct,
        };
      } else {
        // lightweight heuristic for yes/no
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
      // keep "server" in sync
      serverState.current = {
        ...serverState.current,
        remainingTurns: res.remainingTurns,
        suggestedQuestions: res.nextSuggestedQuestions,
      };

      // ✅ update React-Query cache so UI gets the new 4 questions immediately
      qc.setQueryData<GuessMasterData>(dataKey, (prev) =>
        prev
          ? {
            ...prev,
            remainingTurns: res.remainingTurns,
            suggestedQuestions: res.nextSuggestedQuestions ?? prev.suggestedQuestions,
          }
          : prev
      );
    },
  });

  return { dataQuery, askMutation };
}

export default function GuessMaster20Game({ onScoreChange, onGameOver, paused }: GameProps) {
  const qc = useQueryClient();
  const { dataQuery, askMutation } = USE_MOCK ? useGuessMaster20Mock() : useGuessMaster20Real();

  const [history, setHistory] = useState<GuessTurn[]>([]);
  const [guessWord, setGuessWord] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null | undefined>(undefined);
  const [ended, setEnded] = useState(false);

  const [remaining, setRemaining] = useState<number>(20);

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
  useEffect(() => {
    console.log("GM20 dataQuery state:", {
      status: dataQuery.status,
      isLoading: dataQuery.isLoading,
      isError: dataQuery.isError,
      data: dataQuery.data,
    });
  }, [dataQuery.status, dataQuery.isLoading, dataQuery.isError, dataQuery.data]);

  const loading = dataQuery.isLoading;
  const error = dataQuery.isError || !dataQuery.data;
  const sessionId = dataQuery.data?.sessionId ?? "";
  const suggested = dataQuery.data?.suggestedQuestions ?? [];
  const dataKey = ["gm20", "data", USE_MOCK ? "mock" : "real"] as const;

  const disabledUI = paused || loading || askMutation.isPending || ended;

  const renderedHistory = useMemo(
    () =>
      history.map((h, i) => (
        <li key={i} className="flex items-center gap-3 opacity-70 cursor-not-allowed">
          <span className="text-sm opacity-70">#{i + 1}</span>
          <span className="flex-1">{h.text}</span>
          {h.type === "question" && (
            <span
              className={`px-2 py-1 rounded-lg text-sm ${h.answer ? "bg-emerald-600/80" : "bg-rose-600/80"
                }`}
            >
              {h.answer ? "yes" : "no"}
            </span>
          )}
          {h.type === "guess" && (
            <span
              className={`px-2 py-1 rounded-lg text-sm ${h.guessCorrect ? "bg-emerald-600/80" : "bg-rose-600/80"
                }`}
            >
              {h.guessCorrect ? "Correct guess!" : "Incorrect guess"}
            </span>
          )}
        </li>
      )),
    [history]
  );


  async function askSuggested(questionText: string, questionId?: number) {
    if (!sessionId || disabledUI) return;

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

      setRemaining(res.remainingTurns);

      qc.setQueryData<GuessMasterData>(dataKey, (prev) =>
        prev
          ? {
            ...prev,
            remainingTurns: res.remainingTurns,
            suggestedQuestions: res.nextSuggestedQuestions ?? prev.suggestedQuestions,
          }
          : prev
      );

      setHistory((arr) => [
        ...arr,
        { type: "question", text: questionText, answer: res.yesNoAnswer ?? null },
      ]);
      setSelectedAnswer(res.yesNoAnswer ?? null);

      if (res.gameOver) {
        const score = (res.won ? 100 : 0) + Math.max(0, res.remainingTurns) * (res.won ? 5 : 0);
        setEnded(true);
        onScoreChange?.(score);
        onGameOver?.();
      } else {
        setTimeout(() => {
          setSelectedIdx(null);
          setSelectedAnswer(undefined);
        }, 300);
      }
    } catch {
    }
  }


  async function submitGuess() {
    if (!guessWord.trim() || !sessionId || disabledUI) return;

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

      qc.setQueryData<GuessMasterData>(dataKey, (prev) =>
        prev
          ? {
            ...prev,
            remainingTurns: res.remainingTurns,
            suggestedQuestions: res.nextSuggestedQuestions ?? [],
          }
          : prev
      );

      setHistory((arr) => [
        ...arr,
        { type: "guess", text: word, guessCorrect: res.guessCorrect ?? null },
      ]);

      const win = !!(res.won || res.guessCorrect);
      const score = (win ? 100 : 0) + Math.max(0, res.remainingTurns) * (win ? 5 : 0);
      onScoreChange?.(score);
      onGameOver?.();
    } catch {
    }
  }


  if (loading) return <div className="page-container">Loading…</div>;
  if (error) return <div className="page-container">Error loading game data</div>;

  return (
    <div className={`page-container ${disabledUI && !ended ? "opacity-60 pointer-events-none" : ""}`}>
      <div className="game-hud mb-4 flex items-center gap-3">
        <div className="level-badge">Remaining turns: {remaining}</div>
        {ended && (
          <div className="px-3 py-1 rounded-xl bg-white/10 border border-white/10">Game over</div>
        )}
      </div>

      <div className="grid gap-6">
        <div className="panel">
          <h3 className="text-xl font-semibold text-indigo-400 mb-3">History</h3>
          {history.length === 0 ? (
            <div className="text-slate-300">No questions asked yet.</div>
          ) : (
            <ul className="space-y-2">{renderedHistory}</ul>
          )}
        </div>

        <div className="panel space-y-4">
          <h3 className="text-xl font-semibold text-indigo-400">Suggested questions</h3>

          {selectedIdx !== null ? (
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-medium">{suggested[selectedIdx]}</span>
                <span className="text-sm opacity-70">(selected)</span>
              </div>
              <div className="mt-3">
                {selectedAnswer === undefined ? (
                  <div className="text-slate-300">Waiting for answer…</div>
                ) : (
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-sm ${selectedAnswer ? "bg-emerald-600/80" : "bg-rose-600/80"
                      }`}
                  >
                    {selectedAnswer ? "yes" : "no"}
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

          <h4 className="text-lg text-slate-200">Guess the word</h4>
          <div className="flex gap-2">
            <input
              value={guessWord}
              onChange={(e) => setGuessWord(e.target.value)}
              placeholder="Your guess…"
              className="flex-1 rounded-xl px-4 py-2 bg-white/10 border border-white/10 outline-none"
              disabled={disabledUI}
            />
            <button
              className="btn-primary min-w-28"
              onClick={submitGuess}
              disabled={disabledUI || !guessWord.trim()}
            >
              Guess
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
