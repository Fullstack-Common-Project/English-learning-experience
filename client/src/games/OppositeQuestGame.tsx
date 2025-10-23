"use client";

import { useState, useEffect } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { motion, AnimatePresence } from "framer-motion";
import { GameId } from "@/types";
import { useGameData } from "@/hooks/useGameData";
import { OppositeQuestItemSingle } from "@/types/OppositeQuest";

export default function OppositeQuestGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const gameId: GameId = 1;
  const { data, isLoading, isError, refetch } = useGameData(gameId); 

  useEffect(() => {
    refetch();
  }, []);

  const items: OppositeQuestItemSingle[] = Array.isArray(data?.data?.data.items)
    ? data.data.data.items
    : [];

  const currentItem = items[currentIndex];

  const handleAnswer = (i: number) => {
    if (!currentItem || paused || completed || isWaiting) return;

    const isCorrect = i === currentItem.correctIndex;
    setIsWaiting(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      onScoreChange?.((prev) => (prev ?? 0) + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
      setHighlightIndex(currentItem.correctIndex);
    }

    setTimeout(() => {
      setFeedback(null);
      setHighlightIndex(null);
      setIsWaiting(false);
      moveNext();
    }, 1200);
  };

  const moveNext = () => {
    const next = currentIndex + 1;
    if (next < items.length) {
      setCurrentIndex(next);
    } else {
      setCompleted(true);
      onGameOver?.();
      // refetch()
    }
  };


  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || items.length === 0) return <p className="text-center mt-10">No data available.</p>;

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-2xl font-bold text-center">🎉 Game Over!</p>
        <p className="text-lg mt-2 text-gray-700">Final Score: {score}</p>
      </div>
    );
  }

  return (
    <div className="opposite-quest-game grid gap-4 relative min-h-[320px]">
      <h2 className="text-2xl font-bold text-center">{currentItem.word}</h2>

      <div className="grid md:grid-cols-2 gap-3">
        {currentItem.options.map((opt, i) => {
          const isHighlighted = i === highlightIndex;
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={paused || isWaiting}
              className={`px-4 py-2 rounded text-white transition-all duration-150 transform
                ${
                  feedback === "wrong" && i === highlightIndex
                    ? "bg-green-500 animate-pulse"
                    : feedback === "wrong" && i !== highlightIndex
                    ? "bg-red-500"
                    : "bg-blue-500 hover:scale-105"
                }
                disabled:opacity-50`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            key={feedback}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className={`text-4xl font-extrabold px-6 py-4 rounded-2xl shadow-lg bg-opacity-80 backdrop-blur-md
                ${feedback === "correct" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
            >
              {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-2">
        <p>
          Question {currentIndex + 1} of {items.length}
        </p>
        <p className="mt-1">Current Score: {score}</p>
      </div>
    </div>
  );
}
