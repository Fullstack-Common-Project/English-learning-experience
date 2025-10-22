"use client";
import { useState, useEffect } from "react";
import { GameProps } from "@/components/common/GameLayout";

type Sentence = {
  id: number;
  text: string;
};

const demoSentences: Sentence[] = [
  { id: 1, text: "The quick brown fox" },
  { id: 2, text: "jumps over the lazy dog" },
  { id: 3, text: "Hello world!" },
];

export default function SentenceShuffleGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (demoSentences[currentIndex]) {
      const words = demoSentences[currentIndex].text.split(" ");
      setShuffledWords(shuffleArray(words));
      setSelectedOrder([]);
    }
  }, [currentIndex]);

  const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  const handleSelectWord = (word: string) => {
    if (paused || completed) return;
    setSelectedOrder(prev => [...prev, word]);
  };

  const handleSubmit = () => {
    if (paused || completed) return;

    const original = demoSentences[currentIndex].text.split(" ");
    if (selectedOrder.join(" ") === original.join(" ")) {
      onScoreChange?.((prev) => prev + 10);
    }

    if (currentIndex + 1 < demoSentences.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      onGameOver?.();
    }
  };

  if (completed) {
    return <p className="sentence-game__completed">כל המשפטים הושלמו! 👏</p>;
  }

  return (
    <div className="sentence-game">
      <h3 className="sentence-game__title">
        Sentence {currentIndex + 1} from {demoSentences.length}
      </h3>

      <div className="sentence-game__words">
        {shuffledWords.map(word => (
          <button
            key={word + Math.random()}
            onClick={() => handleSelectWord(word)}
            disabled={paused}
            className={`sentence-game__word ${paused ? 'sentence-game__word--disabled' : ''}`}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="sentence-game__selected">
        <p>The correct sentence: {selectedOrder.join(" ")}</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={paused}
        className={`btn-primary sentence-game__submit ${paused ? 'sentence-game__submit--disabled' : ''}`}
      >
        Submit
      </button>
    </div>
  );
}
