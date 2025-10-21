"use client";
import { motion } from "framer-motion";

interface GameCardProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function GameCard({ text, isSelected, onClick }: GameCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isSelected ? 1.05 : 1,
        backgroundColor: isSelected ? "#ec4899" : "#ffffff",
        color: isSelected ? "#ffffff" : "#1f2937",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 12,
      }}
    //   className={`rounded-2xl shadow-md border-2 ${
    //     isSelected ? "border-pink-500" : "border-gray-300"
    //   } px-6 py-4 font-semibold text-lg hover:shadow-lg transition-all`}

      className={`rounded-2xl shadow-md border-2 px-6 py-4 font-semibold text-lg hover:shadow-lg transition-all ${
  isSelected
    ? "border-pink-500 bg-pink-500 text-white animate-pulse"
    : "border-gray-300 bg-white text-gray-800"
}`}

    >
      {text}
    </motion.button>
  );
}
