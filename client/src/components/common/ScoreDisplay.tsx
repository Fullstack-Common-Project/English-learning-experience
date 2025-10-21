"use client";
import { motion } from "framer-motion";

export const ScoreDisplay = ({ score }: { score: number }) => {
  return (
    <motion.div
      className="fixed top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-indigo-100"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-indigo-700 font-bold text-lg">
        ⭐ ניקוד: {Math.round(score)}
      </span>
    </motion.div>
  );
};
