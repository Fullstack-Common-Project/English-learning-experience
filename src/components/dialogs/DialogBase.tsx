"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DialogBaseProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function DialogBase({ title, onClose, children }: DialogBaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-purple-300/60 via-indigo-200/60 to-pink-200/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-lg p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-purple-600 mb-4 text-center">{title}</h2>
        <div className="text-gray-700 leading-relaxed text-center">{children}</div>
      </motion.div>
    </motion.div>
  );
}
