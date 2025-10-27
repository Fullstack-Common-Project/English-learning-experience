import React from "react";
import { motion } from "framer-motion";
import { DraggableItem } from "@/hooks/useDragAndDrop";

interface SentenceBoardProps {
  initialWords: DraggableItem[];
  status: "idle" | "success" | "error";
  paused?: boolean;
}

export default function SentenceBoard({
  initialWords,
  status,
  paused,
}: SentenceBoardProps) {
  return (
    <div className="sentence-board flex gap-2 flex-wrap">
      {initialWords.map((word) => (
        <motion.div
          key={word.id}
          className={`word-slot ${status}`}
          draggable={!paused}
        >
          {word.value}
        </motion.div>
      ))}
    </div>
  );
}
