"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import { GameProps } from "@/components/common/GameLayout";
import { GameId } from "@/types";
import { useGameData } from "@/hooks/useGameData";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";
import { Timer } from "@/components/common/Timer";
import { RhymeTimeResponse } from "@/types/gamesTypes/RhymeTime";

export default function RhymeTimeGame({ onScoreChange, onGameOver, paused }: GameProps) {
//   const gameId: GameId = GameId.RhymeTime;
  const gameId: GameId = 18;

  const { data, isLoading, isError, refetch } = useGameData(gameId);
  const { data: leaderboard, refetch: refetchLeaderboard } = useLeaderboard(gameId);
  const submitProgress = useSubmitProgress();

  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [round, setRound] = useState(1);
  const [floatScore, setFloatScore] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  // 🧠 חילוץ הנתונים מהמבנה שחוזר מהשרת (זה קריטי כדי למנוע undefined)
  const gameData: RhymeTimeResponse["data"] | undefined =
    data?.data?.data?.data || data?.data?.data || data?.data;

  // צלילים
  const sounds = {
    bad: "/sounds/bad.mp3",
    ok: "/sounds/ok.mp3",
    good: "/sounds/good.mp3",
    excellent: "/sounds/excellent.mp3",
  };

  const playSound = (points: number) => {
    let file = sounds.bad;
    if (points >= 80) file = sounds.excellent;
    else if (points >= 50) file = sounds.good;
    else if (points >= 20) file = sounds.ok;
    new Howl({ src: [file], volume: 0.7 }).play();
  };

  const restartGame = async () => {
    setScore(0);
    setRound(1);
    setCompleted(false);
    setSelected([]);
    await refetch();
    await refetchLeaderboard();
  };

  const handleSelect = (i: number) => {
    if (paused || completed) return;
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  // const handleSubmit = async () => {
  //   if (!gameData?.correctIndices || paused) return;

  //   const correct = gameData.correctIndices;
  //   const correctChosen = selected.filter((i) => correct.includes(i)).length;
  //   const partial = Math.round((correctChosen / correct.length) * 100);

  //   playSound(partial);
  //   setScore((s) => s + partial);
  //   onScoreChange?.((prev) => (prev ?? 0) + partial);
  //   setFloatScore(partial);
  //   setTimeout(() => setFloatScore(null), 1000);

  //   await submitProgress.mutateAsync({
  //     gameID: gameId,
  //     userID: 1, // מזהה זמני
  //     score: partial,
  //     time: 10 * round,
  //     rounds: round,
  //   });

  //   setSelected([]);
  //   setRound((r) => r + 1);

  //   if (round >= 5) {
  //     setCompleted(true);
  //     onGameOver?.();
  //   } else {
  //     await refetch();
  //   }
  // };

  const handleSubmit = async () => {
  if (!gameData?.correctIndices || paused) return;

  const correct = gameData.correctIndices;

  // אילו תשובות המשתמש בחר
  const correctChosen = selected.filter((i) => correct.includes(i)).length;
  const wrongChosen = selected.filter((i) => !correct.includes(i)).length;

  // חישוב ניקוד — לדוגמה:
  // כל תשובה נכונה = +25 נק׳, כל שגויה = -10 נק׳
  const partial = Math.max(0, correctChosen * 25 - wrongChosen * 10);

  // 💬 נזהה את סוג התוצאה
  let feedbackType: "perfect" | "partial" | "wrong" = "wrong";
  if (correctChosen === correct.length && wrongChosen === 0) {
    feedbackType = "perfect";
  } else if (correctChosen > 0) {
    feedbackType = "partial";
  }

  // 🎵 צליל מתאים
  if (feedbackType === "perfect") playSound(100);
  else if (feedbackType === "partial") playSound(50);
  else playSound(0);

  // 🧮 עדכון ניקוד
  setScore((s) => s + partial);
  onScoreChange?.((prev) => (prev ?? 0) + partial);

  // ✨ הצגת ניקוד זמני וצבע שונה לפי התוצאה
  setFloatScore(partial);
  setTimeout(() => setFloatScore(null), 1000);

  // שליחת התקדמות לשרת
  await submitProgress.mutateAsync({
    gameID: gameId,
    userID: 1,
    score: partial,
    time: 10 * round,
    rounds: round,
  });

  await refetch();
  await refetchLeaderboard();

  // איפוס בחירה לסבב הבא
  setSelected([]);
  setRound((r) => r + 1);

  // בדיקת סיום משחק
  if (round >= 5) {
    onGameOver?.();
  }
};


  // מצבים
  if (isLoading) return <p className="text-center mt-10 text-purple-600">🔄 Loading data...</p>;
  if (isError || !gameData?.options)
    return (
      <p className="text-center text-red-600">
        ⚠️ Error retrieving data from the server or no data to display.
      </p>
    );

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-2xl font-bold text-center">🎉 Well done! You finished the game!</p>
        <p className="text-lg mt-2 text-gray-700">Final score: {score}</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          onClick={restartGame}
        >
          Play again 🎮
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center p-8 text-center">
      {/* <Timer /> */}

      <h2 className="mb-6 text-3xl font-bold text-purple-700">
        What word rhymes with <span>{gameData.word}</span>?
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {gameData.options.map((opt: string, i: number) => (
          <motion.button
            key={i}
            onClick={() => handleSelect(i)}
            whileTap={{ scale: 0.9 }}
            // className={`rounded-xl border-2 px-6 py-3 font-semibold transition-all ${
            //   selected.includes(i)
            //     ? "border-pink-500 shadow-lg bg-pink-200"
            //     : "border-gray-300 bg-white"
            // }`}

            className={`rounded-xl border-2 px-6 py-3 font-semibold transition-all ${
  selected.includes(i)
    ? "border-pink-500 bg-pink-500 text-white shadow-lg"
    : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
}`}

          >
            {opt}
          </motion.button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={paused}
        className={`px-6 py-3 text-white shadow-md rounded-xl transition ${
          paused
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90"
        }`}
      >
        Check answer ✅
      </button>

      <AnimatePresence>
        {floatScore !== null && (
          <motion.div
            key={floatScore}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: -60 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className={`absolute text-5xl font-extrabold ${
              floatScore === 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            +{floatScore}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 font-bold text-indigo-700">
        Current score: {score} | Round {round}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>🏆 Ranking table: {leaderboard?.data?.leaderboards?.length || 0} Players</p>
      </div>
    </div>
  );
}

// import { useQuery } from "@tanstack/react-query";
// import { fetchGameData } from "../lib/api";
// import { QUERY_KEYS } from "../lib/queryKeys";
// import type { GameId, GameResponseMap } from "../types";

// // ✨ נוסיף טיפוס גנרי T שיתאים אוטומטית לכל משחק
// export function useGameData<T extends GameResponseMap[GameId]>(gameId: GameId) {
//   return useQuery<T>({
//     queryKey: QUERY_KEYS.gameData(gameId),
//     queryFn: async () => {
//       const res = await fetchGameData(gameId);
//       return res as T;
//     },
//   });
// }

