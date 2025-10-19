"use client";
import { ReactNode, useState, useEffect, cloneElement, ReactElement } from "react";
import Timer from "../leaderboard/Timer";
import ScoreDisplay from "../leaderboard/ScoreDisplay";

type GameLayoutProps = {
  gameComponent: ReactElement<GameProps>;
  helpComponent?: ReactElement;
  onGameOver?: (score: number) => void;
};

export interface GameProps {
  onAddScore?: (points: number) => void;
  onGameOver?: (timeMs: number) => void;
}



export default function GameLayout({ gameComponent }: GameLayoutProps) {
  const [stage, setStage] = useState<"welcome" | "help" | "game" | "end">("welcome");
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    if (stage === "game") {
      setRunning(true);
    }
  }, [stage]);

  const handleFinish = (timeMs: number) => {
    setRunning(false);
    setGameOver(true);
    console.log("Last time ⏱", timeMs);
  };

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const gameWithProps = cloneElement(gameComponent, {
    onAddScore: addScore,
    onGameOver: handleFinish,
  });


  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-100 to-blue-200 p-6">
      {/* HUD */}
      <div className="w-full max-w-4xl flex justify-between items-center bg-white/70 backdrop-blur shadow-lg rounded-2xl px-6 py-3 mb-6">
        <Timer running={running} gameOver={gameOver} onFinish={handleFinish} />
        <ScoreDisplay score={score} />
      </div>

      {/* אזור המשחק */}
      <div className="flex-1 w-full max-w-4xl bg-white shadow-xl rounded-3xl flex items-center justify-center p-6">
        {/* {gameWithProps} */}
      </div>

      {/* שליטה ידנית (זמנית)
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => addScore(10)}
          className="px-5 py-2 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600 transition-all"
        >
          +10 ניקוד
        </button>
        <button
          onClick={() => setGameOver(true)}
          className="px-5 py-2 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition-all"
        >
          סיום משחק
        </button>
      </div> */}

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setRunning(prev => !prev)}
          className="px-5 py-2 bg-yellow-500 text-white font-semibold rounded-xl shadow hover:bg-yellow-600 transition-all"
        >
          {running ? '⏸ Pause' : '▶️ Resume'}
        </button>
      </div>

    </div>
  );


}
