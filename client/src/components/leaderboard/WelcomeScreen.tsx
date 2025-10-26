"use client";
import React, { FC } from "react";

type WelcomeScreenProps = {
  onStart?: () => void;
  description?: string;
};

const WelcomeScreen: FC<WelcomeScreenProps> = ({ onStart, description }) => {
  return (
    <div className="help-screen">
      <h2 className="help-screen__title">🎮 Welcome!</h2>
      <p className="help-screen__text">
        {description ?? "Welcome to the game!"}
      </p>
      {onStart && (
        <button onClick={onStart} className="btn-primary help-screen__button">
          Start ▶
        </button>
      )}
    </div>
  );
};

export default WelcomeScreen;
