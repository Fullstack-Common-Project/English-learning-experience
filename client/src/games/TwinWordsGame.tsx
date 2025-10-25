"use client";
import { useState, useEffect } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { motion, AnimatePresence } from "framer-motion";
import { GameId } from "@/types";
import { useGameData } from "@/hooks/useGameData";
import { TwinWordsItem, TwinWordsSingleQuestion } from "@/types/TwinWords";

export default function TwinWordsGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const gameId: GameId = 10;

  const { data, isLoading, isError, refetch } = useGameData(gameId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    refetch();
  }, []);

   const items: TwinWordsSingleQuestion[] = Array.isArray(data?.data?.data.items)
    ? data.data.data.items
    : [];


  const currentQuestion = items[currentIndex];

  const handleSelect = (i: number) => {
    if (!currentQuestion || paused || isWaiting || completed) return;

    setSelectedIndex(i);
    setIsWaiting(true);

    const isCorrect = i === currentQuestion.correctIndex;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (!isCorrect) setHighlightIndex(currentQuestion.correctIndex);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      onScoreChange?.((prev) => (prev ?? 0) + 1);
    } else {
      onScoreChange?.((prev) => (prev ?? 0) - 1);
    }

    setTimeout(() => {
      setSelectedIndex(null);
      setHighlightIndex(null);
      setFeedback(null);
      setIsWaiting(false);

      const next = currentIndex + 1;
      if (next < items.length) {
        setCurrentIndex(next);
      } else {
        setCompleted(true);
        onGameOver?.();
      }
    }, 1200);
  };

  if (isLoading) return <p>loading game...</p>;
  if (isError || items.length === 0) return <p>error in loading game.</p>;
  if (completed) return <p className="twinwords__completed">🎉 All questions completed!</p>;

  return (
    <div className="twinwords">
      <h3 className="twinwords__title">
        Word {currentIndex + 1} of {items.length}
      </h3>

      <h2 className="twinwords__word">{currentQuestion.word}</h2>

      <div className="twinwords__options grid md:grid-cols-2 gap-3">
        {currentQuestion.options.map((opt, index) => {
          let bgClass = "bg-blue-500 hover:scale-105";
          if (feedback === "correct" && selectedIndex === index) bgClass = "bg-green-500";
          if (feedback === "wrong") {
            if (selectedIndex === index) bgClass = "bg-red-500";
            if (highlightIndex === index) bgClass = "bg-green-500 animate-pulse";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={paused || isWaiting}
              className={`px-4 py-2 rounded text-white transition-all duration-150 transform ${bgClass} disabled:opacity-50`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {feedback && (
        <p className="twinwords__feedback text-center mt-2 text-xl font-bold">
          {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
        </p>
      )}
    </div>
  );
}
