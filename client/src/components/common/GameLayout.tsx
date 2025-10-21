"use client";
import React, { useState, useEffect } from "react";
import useGameState from "@/hooks/useGameState";
import ScoreDisplay from "../leaderboard/ScoreDisplay";
import GameOverModal from "../leaderboard/GameOverModal";
import HelpScreen from "../leaderboard/HelpScreen";
import useGameTimer from "@/hooks/useGameTimer";
import Countdown3_2_1 from "../hud/countdown3_2_1";
import AudioToggle from "../hud/audioToggle";
import { QueryProvider } from "@/providers/QueryProvider";

export type GameProps = {
  onScoreChange?: (value: number | ((prev: number) => number)) => void;
  onGameOver?: () => void;
  paused?: boolean;
};

type GameLayoutProps = {
  children: React.ReactNode;
  gameTitle: string;
};

export default function GameLayout({ children, gameTitle }: GameLayoutProps) {
  const { stage, goToStage, nextStage, resetGame } = useGameState("welcome");
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { time, start, stop, reset } = useGameTimer(0);
  const [paused, setPaused] = React.useState(false);
  const [countdownActive, setCountdownActive] = React.useState(false);

  useEffect(() => {
    const savedTotal = localStorage.getItem("totalScore");
    if (savedTotal) setTotalScore(Number(savedTotal));
  }, []);

  React.useEffect(() => {
    if (stage === "game" && !gameOver && !paused) start();
    else stop();
  }, [stage, gameOver, paused]);

  const handleGameOver = () => {
    stop();
    setGameOver(true);
    goToStage("end");
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    reset();
    resetGame();
  };

  const handleScoreChange = (value: number | ((prev: number) => number)) => {
    setScore((prev) => {
      const newScore = typeof value === "function" ? value(prev) : value;
      setTotalScore((prevTotal) => {
        const newTotal = prevTotal + (newScore - prev);
        localStorage.setItem("totalScore", String(newTotal));
        return newTotal;
      });
      return newScore;
    });
  };

  const handleResume = () => setCountdownActive(true);

  return (
     <QueryProvider> <div className="game-layout">
      <h1 className="game-layout__title">{gameTitle}</h1>

      {/* Welcome */}
      {stage === "welcome" && (
        <div className="game-layout__center">
          <button onClick={nextStage} className="btn-primary">
            Start ▶
          </button>
        </div>
      )}

      {/* Help */}
      {stage === "help" && <HelpScreen onContinue={() => goToStage("game")} />}

      {/* Game */}
      {stage === "game" && (
        <div className="game-layout__container">
          {(paused || countdownActive) && (
            <div className="game-overlay">
              {paused && !countdownActive && (
                <button onClick={handleResume} className="btn-secondary">
                  ▶ Resume
                </button>
              )}
              {countdownActive && (
                <Countdown3_2_1
                  onFinish={() => {
                    setCountdownActive(false);
                    setPaused(false);
                  }}
                />
              )}
            </div>
          )}

          <div className={`game-hud ${paused || countdownActive ? "disabled" : ""}`}>
            <div className="hud-timer">
              {Math.floor(time / 60)}:{time % 60 < 10 ? "0" + (time % 60) : time % 60}
            </div>
            <ScoreDisplay score={score} />
            <AudioToggle />
            <button
              onClick={() => setPaused(true)}
              className="btn-secondary"
              disabled={paused || countdownActive}
            >
              ⏸ Pause
            </button>
          </div>

          <div className={`game-content ${paused || countdownActive ? "disabled" : ""}`}>
            {React.isValidElement(children) &&
              React.cloneElement(children as React.ReactElement<GameProps>, {
                onScoreChange: handleScoreChange,
                onGameOver: handleGameOver,
                paused: paused || countdownActive,
              })}
          </div>
        </div>
      )}

      {/* End */}
      {stage === "end" && gameOver && (
        <GameOverModal score={score} time={time} onRestart={handleRestart} />
      )}
    </div></QueryProvider>
   
  );
}
