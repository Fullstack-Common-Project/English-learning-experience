import { useState } from "react";

export type GameStage = "welcome" | "help" | "play" | "results";

export const useGameState = () => {
  const [stage, setStage] = useState<GameStage>("welcome");

  const nextStage = () => {
    setStage((prev) =>
      prev === "welcome"
        ? "help"
        : prev === "help"
        ? "play"
        : prev === "play"
        ? "results"
        : "welcome"
    );
  };

  const reset = () => setStage("welcome");

  return { stage, nextStage, reset };
};
