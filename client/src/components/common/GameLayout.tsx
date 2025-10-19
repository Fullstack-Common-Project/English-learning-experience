"use client";
import { ReactNode, useState, useEffect, cloneElement, ReactElement } from "react";
import Timer from "../leaderboard/Timer";
import ScoreDisplay from "../leaderboard/ScoreDisplay";
import useGameState, { GameStage } from "@/hooks/useGameState";
import GameOverModal from "../leaderboard/GameOverModal";

type GameLayoutProps = {
  gameComponent: ReactElement<GameProps>;
  helpComponent?: ReactElement<{ onContinue?: () => void }>;
  onGameOver?: (score: number) => void;
};

export interface GameProps {
  onAddScore?: (points: number) => void;
  onGameOver?: (timeMs: number) => void;
}



export default function GameLayout({ gameComponent, helpComponent, onGameOver }: GameLayoutProps) {

  const { stage, nextStage, startGame, resetGame } = useGameState();
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    setGameOver(false);
  }, [stage]); // רק כש‑stage משתנה


  // ה‑HelpScreen עם onContinue
  const helpWithProps =
    helpComponent &&
    cloneElement(helpComponent, {
      onContinue: () => {
        nextStage();      // עובר לשלב game
        setRunning(true); // מתחיל את הטיימר
      }
    });


  const handleFinish = (timeMs: number) => {
    setRunning(false);
    setGameOver(true);
    console.log("Last time ⏱", timeMs);
    onGameOver?.(score);
    nextStage(); // עובר לשלב end
  };

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const gameWithProps = cloneElement(gameComponent, {
    onAddScore: addScore,
    onGameOver: (timeMs: number) => {
      setRunning(false);
      setGameOver(true);
      setFinalTime(timeMs);
      setShowGameOver(true);
      onGameOver?.(score);
      nextStage();
    }
  });

  const handleRestart = () => {
    resetGame();
    setScore(0);
    setFinalTime(null);
    setShowGameOver(false);
    setRunning(false);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-100 to-blue-200 p-6">

      {/* HUD */}
      <div className="w-full max-w-4xl flex justify-between items-center bg-white/70 backdrop-blur shadow-lg rounded-2xl px-6 py-3 mb-6">
        <Timer running={running} gameOver={gameOver} onFinish={handleFinish} />
        <ScoreDisplay score={score} />
        <button
          onClick={() => setRunning(prev => !prev)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition-all"
        >
          {running ? "⏸ Pause" : "▶️ Resume"}
        </button>
      </div>

      {/* אזור המשחק */}
      <div className="flex-1 w-full max-w-4xl bg-white shadow-xl rounded-3xl flex items-center justify-center p-6">
        {stage === "welcome" && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">ברוכים הבאים למשחק!</h2>
            <button
              onClick={() => {
                startGame();  // מתחיל משחק
              }}
              className="mt-2 px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition-all"
            >
              Start Game
            </button>
          </div>
        )}
        {stage === "help" && helpWithProps}
        {stage === "game" && gameWithProps}
        {stage === "end" && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">🎉 המשחק הסתיים!</h2>
            <p className="mb-2">ניקוד סופי: {score}</p>
            <button
              onClick={() => {
                resetGame();   // חוזר ל-welcome
                setScore(0);   // מאפס ניקוד
                setGameOver(false);
                setRunning(false);
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition-all"
            >
              Restart
            </button>
          </div>
        )}
      </div>

      {/* GameOver Modal */}
      {showGameOver && finalTime !== null && (
        <GameOverModal
          score={score}
          time={finalTime}
          onRestart={handleRestart}
        />
      )}


    </div>
  );
}
