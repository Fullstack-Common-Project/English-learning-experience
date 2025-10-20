"use client";
import React, { useState, useEffect } from "react";
import useGameState from "@/hooks/useGameState";
import ScoreDisplay from "../leaderboard/ScoreDisplay";
import GameOverModal from "../leaderboard/GameOverModal";
import HelpScreen from "../leaderboard/HelpScreen";
import useGameTimer from "@/hooks/useGameTimer";

export type GameProps = {
  onScoreChange?: (value: number | ((prev: number) => number)) => void;
  onGameOver?: () => void;
  paused?: boolean;
};

type GameLayoutProps = {
  children: React.ReactNode; // המשחק עצמו
  gameTitle: string;         // שם המשחק
};

interface GameChildProps {
  onScoreChange?: (value: number | ((prev: number) => number)) => void;
  onGameOver?: () => void;
}

export default function GameLayout({ children, gameTitle }: GameLayoutProps) {
  const { stage, goToStage, nextStage, resetGame } = useGameState("welcome");
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { time, start, stop, reset, running } = useGameTimer(0);
  const [paused, setPaused] = React.useState(false);
  const [finalTime, setFinalTime] = useState(0);


  // useEffect(() => {
  //   const savedTotal = localStorage.getItem("totalScore");
  //   if (savedTotal) setTotalScore(Number(savedTotal));
  // }, []);

  React.useEffect(() => {
    if (stage === "game" && !gameOver && !paused) start();
    else stop();
  }, [stage, gameOver, paused]);

  const handleGameOver = () => {
    stop();
    // setFinalTime(time); // תופס את הזמן ברגע הסיום
    setGameOver(true);
    goToStage("end");
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    reset();
    resetGame();
  };

  const addScore = () => {
    setScore(score + 10);
  }

  // const handleScoreChange = (value: number | ((prev: number) => number)) => {
  //   setScore(prev => {
  //     const newScore = typeof value === "function" ? value(prev) : value;
  //     setTotalScore(prevTotal => {
  //       const newTotal = prevTotal + (newScore - prev);
  //       localStorage.setItem("totalScore", String(newTotal));
  //       return newTotal;
  //     });
  //     return newScore;
  //   });
  // };

  console.log("time" + time);
  console.log("final" + finalTime);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 drop-shadow">
        {gameTitle}
      </h1>

      {/* Welcome */}
      {stage === "welcome" && (
        <div className="text-center">
          <p className="text-lg mb-6">ברוכים הבאים למשחק {gameTitle}!</p>
          <button
            onClick={nextStage}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
          >
            התחל ▶
          </button>
        </div>
      )}

      {/* Help */}
      {stage === "help" && (
        <HelpScreen onContinue={() => goToStage("game")} />
      )}

      {/* Game */}
      {stage === "game" && (
        <div className=" w-full max-w-3xl">
          {/* Pause Overlay */}
          {paused && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl z-10"></div>
          )}

          <div className="flex justify-between items-center mb-6 relative z-20">
            {/* הזמן */}
            <div className="font-mono text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:scale-105 transition-transform">
              {Math.floor(time / 60)}:{time % 60 < 10 ? "0" + (time % 60) : time % 60}
            </div>

            {/* Score */}
            <ScoreDisplay score={score} />

            {/* כפתור Pause / Resume */}
            <button
              onClick={() => setPaused(!paused)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition-all relative z-30"
            >
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
          </div>


          <div className="bg-white rounded-2xl shadow p-6">
            {React.isValidElement(children) &&
              React.cloneElement(children as React.ReactElement<GameProps>, {
                onScoreChange: addScore,
                onGameOver: handleGameOver,
                paused: paused
              })}
          </div>

        </div>
      )}

      {/* End */}
      {stage === "end" && gameOver && (
        <GameOverModal
          score={score}
          time={time} // זמן ישר מה-Timer, בלי finalTime
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}


