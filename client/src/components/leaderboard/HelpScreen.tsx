"use client";
import { FC } from "react";

type HelpScreenProps = {
  onContinue?: () => void; // פונקציה להמשך למשחק
};

const HelpScreen: FC<{ onContinue?: () => void }> = ({ onContinue }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">💡 How to play?</h2>
      <p className="text-gray-600">
        Here you will add the explanation of the game:
        What is the goal, how do you earn points, what actions can be performed.
      </p>
      {onContinue && (
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition-all"
        >
          Move the game
        </button>
      )}
    </div>
  );
};

export default HelpScreen;
