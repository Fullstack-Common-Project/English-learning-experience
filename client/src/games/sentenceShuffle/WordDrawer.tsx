import React from "react";
import { DraggableItem } from "@/hooks/useDragAndDrop";

interface WordDrawerProps {
  initialWords: DraggableItem[];
  paused?: boolean;
  status: "idle" | "success" | "error";
}

export default function WordDrawer({ initialWords, paused }: WordDrawerProps) {
  return (
    <div className="word-drawer flex gap-2 flex-wrap">
      {initialWords.map((item) => (
        <button key={item.id} draggable={!paused}>
          {item.value}
        </button>
      ))}
    </div>
  );
}
