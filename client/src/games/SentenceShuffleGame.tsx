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

  // Shuffle words for the current sentence
  useEffect(() => {
    if (demoSentences[currentIndex]) {
      const words = demoSentences[currentIndex].text.split(" ");
      setShuffledWords(shuffleArray(words));
      setSelectedOrder([]);
    }
  }, [currentIndex]);

  const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  const handleSelectWord = (word: string) => {
    if (paused || completed) return; // לא מאפשר לבחור בזמן הפסקה או לאחר סיום
    setSelectedOrder(prev => [...prev, word]);
  };

  const handleSubmit = () => {
    if (paused || completed) return;

    const original = demoSentences[currentIndex].text.split(" ");
    if (selectedOrder.join(" ") === original.join(" ")) {
      // הוספת ניקוד דרך onScoreChange מ-GameLayout
      onScoreChange?.((prev) => prev + 10);
    }

    if (currentIndex + 1 < demoSentences.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      onGameOver?.(); // GameLayout ינהל את הזמן והסיום
    }
  };

  if (completed) {
    return (
      <p className="text-xl font-semibold text-green-600">
        כל המשפטים הושלמו! 👏
      </p>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">
        Sentence {currentIndex + 1} from {demoSentences.length}
      </h3>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {shuffledWords.map(word => (
          <button
            key={word + Math.random()}
            onClick={() => handleSelectWord(word)}
            disabled={paused} // כפתורים לא פעילים בזמן Pause
            className={`px-3 py-1 rounded-lg text-white transition-all ${
              paused ? "bg-gray-700 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="mb-4 text-green-400">
        <p>The correct sentence: {selectedOrder.join(" ")}</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={paused}
        className={`px-6 py-3 rounded-xl shadow text-white transition-all ${
          paused ? "bg-gray-700 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Submit
      </button>
    </div>
  );
}