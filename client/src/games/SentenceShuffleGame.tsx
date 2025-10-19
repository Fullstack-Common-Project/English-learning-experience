// 'use client';
// import React, { useState } from 'react';
// import  Timer  from '../components/leaderboard/Timer'

// export default function SentenceShuffleGame() {
//  const [running, setRunning] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [finalTime, setFinalTime] = useState<number | null>(null);

//   const handleGameEnd = (time: number) => {
//     setFinalTime(time);
//     console.log('Game ended at:', time / 1000, 'seconds');
//   };

//   return (
//     <div style={{ padding: '24px', backgroundColor: '#0f1320', minHeight: '100vh', color: '#e9edf5' }}>
//       <h1>Sentence Shuffle Demo</h1>

//       {/* {!running && !gameOver && (
//         <button onClick={() => setRunning(true)}>Start Game</button>
//       )}

//       {running && !gameOver && (
//         <button onClick={() => setGameOver(true)}>End Game</button>
//       )}

//       <Timer running={running} gameOver={gameOver} onFinish={handleGameEnd} /> */}

//       {finalTime !== null && (
//         <p>⏱ Final time: {(finalTime / 1000).toFixed(1)} seconds</p>
//       )}
//     </div>
//   );
// }


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

export default function SentenceShuffleGame({ onAddScore, onGameOver }: GameProps) {
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

  const shuffleArray = (arr: string[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const handleSelectWord = (word: string) => {
    setSelectedOrder(prev => [...prev, word]);
  };

  const handleSubmit = () => {
    const original = demoSentences[currentIndex].text.split(" ");
    if (selectedOrder.join(" ") === original.join(" ")) {
      onAddScore?.(10); // ניקוד +10
    }
    if (currentIndex + 1 < demoSentences.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      onGameOver?.(0); // הזמן יגיע מה־Timer
    }
  };

  if (completed) return <p className="text-xl font-semibold">משפטים הושלמו!</p>;

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">
        משפט {currentIndex + 1} מתוך {demoSentences.length}
      </h3>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {shuffledWords.map(word => (
          <button
            key={word + Math.random()}
            onClick={() => handleSelectWord(word)}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            {word}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <p>סדר נבחר: {selectedOrder.join(" ")}</p>
      </div>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition-all"
      >
        Submit
      </button>
    </div>
  );
}
