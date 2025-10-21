// hooks/useGameState.ts
import { useState } from "react";

// סוג שלבים אפשריים במשחק
export type GameStage = "welcome" | "help" | "game" | "end";

// ממשק הפונקציות שה-hook מחזיר
interface GameStateHook {
    stage: GameStage;                  // השלב הנוכחי
    goToStage: (newStage: GameStage) => void; // מעבר לשלבים ידני
    nextStage: () => void;             // מעבר לשלב הבא לפי סדר
    startGame: () => void;             // מתחיל את המשחק ישר מ-"game"
    resetGame: () => void;             // מחזיר לשלבים הראשונים
}

export default function useGameState(initialStage: GameStage = "welcome"): GameStateHook {
    const [stage, setStage] = useState<GameStage>(initialStage)

    //מעבר ידני של שלבים
    const goToStage = (newStage: GameStage) => {
        setStage(newStage);
    };

    // מעבר אוטומטי לפי סדר: welcome → help → game → end → welcome
    const nextStage = () => {
        setStage(prev => {
            switch (prev) {
                case "welcome": return "help";
                case "help": return "game";
                case "game": return "end";
                case "end": return "welcome";
            }
        });
    };

    const startGame = () => {
        setStage("help")
    }

    const resetGame = () => {
        setStage(initialStage)
    }
    
    return (
        { stage, goToStage, nextStage, startGame, resetGame }
    )
}