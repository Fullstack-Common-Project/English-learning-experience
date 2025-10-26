"use client";
import React, { FC } from "react";

type HelpScreenProps = {
  onContinue?: () => void;
  instructions?: string;
};

const HelpScreen: FC<HelpScreenProps> = ({ onContinue, instructions }) => {
  return (
    <div className="help-screen">
      <h2 className="help-screen__title">💡 How to play?</h2>
      <p className="help-screen__text">
        {instructions ?? "Instructions not available for this game."}
      </p>

      {onContinue && (
        <button
          onClick={onContinue}
          className="btn-primary help-screen__button"
        >
          Move to the game
        </button>
      )}
    </div>
  );
};

export default HelpScreen;
