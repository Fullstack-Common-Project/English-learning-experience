"use client";
import { motion } from "framer-motion";

export const ChoiceButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ scale: selected ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`px-4 py-3 rounded-xl font-semibold text-lg shadow-md 
        ${
          selected
            ? "bg-indigo-600 text-white"
            : "bg-white text-indigo-700 hover:bg-indigo-100"
        }`}
    >
      {label}
    </motion.button>
  );
};
