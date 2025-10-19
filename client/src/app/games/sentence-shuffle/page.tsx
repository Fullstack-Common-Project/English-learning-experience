'use client';
import React, { useState } from 'react';
import GameLayout from '@/components/common/GameLayout';
import SentenceShuffleGame from '@/games/SentenceShuffleGame';
import useGameTimer from "@/hooks/useGameTimer";

export default function SentenceShufflePage() {
  // const { time, start, stop, reset, running } = useGameTimer(0);
  // const [score, setScore] = useState(0);

  // // קומפוננטת משחק דמה
  // const DummyGame = () => (
  //   <div className="text-center">
  //     <h2 className="text-2xl font-semibold mb-4">🎮 Demo Game Area</h2>
  //     <button
  //       onClick={() => setScore((s) => s + 10)}
  //       className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
  //     >
  //       +10 Points
  //     </button>
  //     <div className="mt-4">
  //       <button
  //         onClick={() => {
  //           start();
  //         }}
  //         className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
  //       >
  //         Start Timer
  //       </button>
  //       <button
  //         onClick={() => stop()}
  //         className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg ml-2"
  //       >
  //         Stop Timer
  //       </button>
  //       <div className="mt-2 text-gray-700 font-semibold">
  //         Timer: {time}s
  //       </div>
  //     </div>
  //   </div>
  // );

  // const DummyHelp = () => (
  //   <div className="text-center">
  //     <h2 className="text-xl font-semibold mb-2">💡 How to Play</h2>
  //     <p className="text-gray-600">Instructions will appear here.</p>
  //   </div>
  // );

  // return (
  //   <GameLayout
  //     gameComponent={<DummyGame />}
  //     helpComponent={<DummyHelp />}
  //     onGameOver={() => console.log("Game Over! Final Score:", score)}
  //   />
  // );

    const handleGameOver = (finalScore: number) => {
    console.log("🎮 המשחק הסתיים! ניקוד סופי:", finalScore);
  };

  return (
    <GameLayout
     gameComponent={<SentenceShuffleGame />}
      onGameOver={handleGameOver}
    />
  );
}