"use client";
import { FC } from "react";

type HelpScreenProps = {
  onContinue?: () => void;
};

const HelpScreen: FC<HelpScreenProps> = ({ onContinue }) => {
  return (
    <div className="help-screen">
      <h2 className="help-screen__title">💡 How to play?</h2>
      <p className="help-screen__text">
        Here you will add the explanation of the game:
        What is the goal, how do you earn points, what actions can be performed.
      </p>

      {onContinue && (
        <button onClick={onContinue} className="btn-primary help-screen__button">
          Move the game
        </button>
      )}
    </div>
  );
};

export default HelpScreen;
