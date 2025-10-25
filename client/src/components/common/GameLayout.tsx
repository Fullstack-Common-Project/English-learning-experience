// "use client";
// import React, { useState, useEffect } from "react";
// import useGameState from "@/hooks/useGameState";
// import ScoreDisplay from "../leaderboard/ScoreDisplay";
// import GameOverModal from "../leaderboard/GameOverModal";
// import HelpScreen from "../leaderboard/HelpScreen";
// import useGameTimer from "@/hooks/useGameTimer";
// import Countdown3_2_1 from "../hud/countdown3_2_1";
// import AudioToggle from "../hud/audioToggle";

// export type GameProps = {
//   onScoreChange?: (value: number | ((prev: number) => number)) => void;
//   onGameOver?: () => void;
//   paused?: boolean;
// };

// type GameLayoutProps = {
//   children: React.ReactNode; // המשחק עצמו
//   gameTitle: string;         // שם המשחק
// };

// interface GameChildProps {
//   onScoreChange?: (value: number | ((prev: number) => number)) => void;
//   onGameOver?: () => void;
// }

// export default function GameLayout({ children, gameTitle }: GameLayoutProps) {
//   const { stage, goToStage, nextStage, resetGame } = useGameState("welcome");
//   const [score, setScore] = useState(0);
//   const [totalScore, setTotalScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const { time, start, stop, reset, running } = useGameTimer(0);
//   const [paused, setPaused] = React.useState(false);
//   const [finalTime, setFinalTime] = useState(0);
//   const [countdownActive, setCountdownActive] = React.useState(false);

//   const handleResume = () => {
//     setCountdownActive(true); // מתחיל את הספירה 3-2-1
//   };

//   useEffect(() => {
//     const savedTotal = localStorage.getItem("totalScore");
//     if (savedTotal) setTotalScore(Number(savedTotal));
//   }, []);

//   React.useEffect(() => {
//     if (stage === "game" && !gameOver && !paused) start();
//     else stop();
//   }, [stage, gameOver, paused]);

//   const handleGameOver = () => {
//     stop();
//     //setFinalTime(time); // תופס את הזמן ברגע הסיום
//     setGameOver(true);
//     goToStage("end");
//   };

//   const handleRestart = () => {
//     setScore(0);
//     setGameOver(false);
//     reset();
//     resetGame();
//   };

//   const addScore = () => {
//     setScore(score + 10);
//   }

//   const handleScoreChange = (value: number | ((prev: number) => number)) => {
//     setScore(prev => {
//       const newScore = typeof value === "function" ? value(prev) : value;
//       setTotalScore(prevTotal => {
//         const newTotal = prevTotal + (newScore - prev);
//         localStorage.setItem("totalScore", String(newTotal));
//         return newTotal;
//       });
//       return newScore;
//     });
//   };

//   console.log("time" + time);
//   console.log("final" + finalTime);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8 relative">

//       <h1 className="text-4xl font-bold text-blue-700 mb-8 drop-shadow">{gameTitle}</h1>

//       {/* Welcome */}
//       {stage === "welcome" && (
//         <div className="text-center">
//           <button
//             onClick={nextStage}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all"
//           >
//             Start ▶
//           </button>
//         </div>
//       )}

//       {/* Help */}
//       {stage === "help" && (
//         <HelpScreen onContinue={() => goToStage("game")} />
//       )}

//       {/* Game */}
//       {stage === "game" && (
//         <div className="w-full max-w-3xl relative z-0">

//           {/* Overlay אפור שקוף שחוסם הכל */}
//           {(paused || countdownActive) && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center"
//               style={{
//                 backgroundColor: "rgba(255, 255, 255, 0.0)", // כמעט שקוף
//                 pointerEvents: "auto", // חוסם לחיצות על הכפתורים שמתחת
//               }}>
//               {paused && !countdownActive && (
//                 <button
//                   onClick={handleResume}
//                   className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition-all"
//                 >
//                   ▶ Resume
//                 </button>
//               )}
//               {countdownActive && (
//                 <Countdown3_2_1
//                   onFinish={() => {
//                     setCountdownActive(false);
//                     setPaused(false);
//                   }}
//                 />
//               )}
//             </div>
//           )}

//           {/* HUD */}
//           <div className={`flex justify-between items-center mb-6 relative z-20 ${paused || countdownActive ? 'pointer-events-none opacity-60' : ''}`}>
//             <div className="font-mono text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow">
//               {Math.floor(time / 60)}:{time % 60 < 10 ? "0" + (time % 60) : time % 60}
//             </div>

//             <ScoreDisplay score={score} />

//             <AudioToggle />

//             <button
//               onClick={() => setPaused(true)}
//               className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition-all"
//               disabled={paused || countdownActive}
//             >
//               ⏸ Pause
//             </button>
//           </div>

//           {/* תוכן המשחק */}
//           <div className={`bg-white rounded-2xl shadow p-6 ${paused || countdownActive ? 'pointer-events-none opacity-60' : ''}`}>
//             {React.isValidElement(children) &&
//               React.cloneElement(children as React.ReactElement<GameProps>, {
//                 onScoreChange: handleScoreChange,
//                 onGameOver: handleGameOver,
//                 paused: paused || countdownActive
//               })}
//           </div>
//         </div>
//       )}

//       {/* End */}
//       {stage === "end" && gameOver && (
//         <GameOverModal
//           score={score}
//           time={time}
//           onRestart={handleRestart}
//         />
//       )}
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import useGameState from "@/hooks/useGameState";
import ScoreDisplay from "../leaderboard/ScoreDisplay";
import GameOverModal from "../leaderboard/GameOverModal";
import HelpScreen from "../leaderboard/HelpScreen";
import useGameTimer from "@/hooks/useGameTimer";
import Countdown3_2_1 from "../hud/countdown3_2_1";
import AudioToggle from "../hud/audioToggle";

export type GameProps = {
  onScoreChange?: (value: number | ((prev: number) => number)) => void;
  onGameOver?: () => void;
  paused?: boolean;
  time?: number;
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
    <div className="game-layout">
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
      {stage === "help" && <HelpScreen onContinue={() => {
        goToStage("game")
      }} />}

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

          <div className="game-content">
            {React.isValidElement(children) &&
              React.cloneElement(children as React.ReactElement<GameProps>, {
                onScoreChange: handleScoreChange,
                onGameOver: handleGameOver,
                paused: paused || countdownActive,
                time, // <-- מוסיפים כאן את הזמן
              })}
          </div>

        </div>
      )}

      {/* End */}
      {stage === "end" && gameOver && (
        <GameOverModal score={score} time={time} onRestart={handleRestart} />
      )}
    </div>
  );
}
