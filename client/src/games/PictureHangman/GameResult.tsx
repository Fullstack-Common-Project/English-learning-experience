"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

interface GameResultProps {
  isWin: boolean;
  score: number;
}

export default function GameResult({ isWin, score }: GameResultProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window dimensions for confetti
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Play sound once when component mounts
    const audio = new Audio(isWin ? "/sounds/win.mp3" : "/sounds/lose.wav");
    audio.play();
  }, [isWin]);

  // Define confetti colors based on win/loss
  const confettiColors = isWin
    ? ["#FF6464", "#FFD700", "#00FFAB", "#4D5BCE", "#FF6BFF", "#FF8C42", "#00CFFF"]
    : ["#000000", "#555555", "#AAAAAA", "#FFFFFF"];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Blurred background */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm pointer-events-auto"></div>

        {/* Confetti */}
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={150}
          recycle={false}
          colors={confettiColors}
        />

        {/* Win / Lose message */}
        <motion.div
          className="relative text-5xl font-bold text-white drop-shadow-lg pointer-events-auto text-center px-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {isWin ? "🎉 You Win! 🎉" : "💀 Game Over 💀"} <br /> Score: {score}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
