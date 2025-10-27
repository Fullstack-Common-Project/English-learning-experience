import React from "react";
import { SentenceShuffleItem } from "@/types/gamesTypes/SentenceShuffle";

interface SubmitButtonProps {
  currentSentence: SentenceShuffleItem;
  status: "idle" | "success" | "error";
  onSubmit: (currentGuess: string) => void;
}

export default function SubmitButton({ onSubmit }: SubmitButtonProps) {
  return <button onClick={() => onSubmit("userGuess")}>Check</button>;
}
