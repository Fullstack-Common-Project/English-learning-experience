// src/games/OppositeQuest/OppositeQuestGame.tsx
"use client";

import { useState, useEffect } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { OppositeItem } from "@/types/oppositeQuestData";
// import GameButton from "@/components/ui/Button";



// נתוני דמו, מחליפים בקלות ב-fetch מהשרת
const demoItems: OppositeItem[] = [
  { id: 1, word: "push", options: ["paperclip", "pull", "gorilla", "boat"], correctIndex: 1 },
  { id: 2, word: "open", options: ["azure", "yell", "singer", "close"], correctIndex: 3 },
  { id: 3, word: "kind", options: ["stand", "punch", "guilty", "mean"], correctIndex: 3 },
  { id: 4, word: "go", options: ["blender", "plum", "orangutan", "come"], correctIndex: 3 },
  { id: 5, word: "run", options: ["skirt", "walk", "armadillo", "pilot"], correctIndex: 1 },
];

export default function OppositeQuestGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentItem = demoItems[currentIndex];

  const handleAnswer = (i: number) => {
    if (paused || completed) return;

    if (i === currentItem.correctIndex) {
      setScore((prev) => prev + 1);
      onScoreChange?.((prev) => (prev ?? 0) + 1);
    }

    const next = currentIndex + 1;
    if (next < demoItems.length) {
      setCurrentIndex(next);
    } else {
      setCompleted(true);
      onGameOver?.();
    }
  };

  if (completed) {
    return <p className="text-center text-xl font-bold mt-4">🎉 המשחק הסתיים! ניקוד סופי: {score}</p>;
  }

  return (
    <div className="opposite-quest-game grid gap-4">
      <h2 className="text-2xl font-bold text-center">{currentItem.word}</h2>

      <div className="grid md:grid-cols-2 gap-3">
        {currentItem.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={paused}
            className="btn-primary px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
          >
            {opt}
          </button>
        // <GameButton
        //   keyProp={i}
        //   onClick={() => handleAnswer(i)}
        //   disabled={paused}
        //  opt={opt}
        // />

        ))}
      </div>

      <p className="text-center mt-2">שאלה {currentIndex + 1} מתוך {demoItems.length}</p>
      <p className="text-center mt-1">ניקוד נוכחי: {score}</p>
    </div>
  );
}
