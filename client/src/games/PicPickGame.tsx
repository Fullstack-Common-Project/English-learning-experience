"use client";
import { useState, useEffect } from "react";
import { GameProps } from "@/components/common/GameLayout";

type PicPickItem = {
  imageUrl: string;
  sentences: string[];
  correctIndex: number;
};

const demoItems: PicPickItem[] = [
  {
    imageUrl: "/images/pic1.png",
    sentences: ["The cat is on the mat", "The dog is in the yard", "A bird is flying", "The fish swims"],
    correctIndex: 0,
  },
  {
    imageUrl: "/images/pic2.png",
    sentences: ["A boy is running", "A girl is sleeping", "A car is parked", "The sun sets"],
    correctIndex: 1,
  },
  {
    imageUrl: "/images/pic3.png",
    sentences: ["Apple is red", "Banana is yellow", "Grapes are green", "Orange is orange"],
    correctIndex: 2,
  },
];

export default function PicPickGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentItem = demoItems[currentIndex];

  const handleAnswer = (index: number) => {
    if (paused || completed) return;

    if (index === currentItem.correctIndex) {
      onScoreChange?.((prev) => prev + 10);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < demoItems.length) {
      setCurrentIndex(nextIndex);
    } else {
      setCompleted(true);
      onGameOver?.();
    }
  };

  if (completed) {
    return <p className="sentence-game__completed">כל התמונות הושלמו! 👏</p>;
  }

  return (
    <div className="sentence-game">
      <h3 className="sentence-game__title">
        Picture {currentIndex + 1} of {demoItems.length}
      </h3>

      <div className="sentence-game__image">
        <img src={currentItem.imageUrl} alt="תמונה לשאלה" className="rounded-2xl" />
      </div>

      <div className="sentence-game__words grid md:grid-cols-2 gap-3">
        {currentItem.sentences.map((s, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={paused}
            className={`btn-primary sentence-game__word ${paused ? "sentence-game__word--disabled" : ""}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
