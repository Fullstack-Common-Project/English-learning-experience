"use client";
import { FC } from "react";

type HelpScreenProps = {
  onContinue?: () => void; // פונקציה להמשך למשחק
};

const HelpScreen: FC<{ onContinue?: () => void }> = ({ onContinue }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">💡 איך לשחק</h2>
      <p className="mb-4">
        כאן תוסיפי את ההסבר על המשחק:  
        מה המטרה, איך מרוויחים נקודות, אילו פעולות אפשר לבצע.
      </p>
      {onContinue && (
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition-all"
        >
          המשך למשחק
        </button>
      )}
    </div>
  );
};

export default HelpScreen;
