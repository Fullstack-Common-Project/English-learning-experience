"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDragAndDrop, DraggableItem } from "@/hooks/useDragAndDrop";
import { useGameData } from "@/hooks/useGameData";
import { GameProps } from "@/components/common/GameLayout";
import { GameId } from "@/types";
import { SentenceShuffleItem } from "@/types/gamesTypes/SentenceShuffle";
import { useSelector } from "react-redux";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";

const generateId = () => Math.floor(Math.random() * 1000000).toString();

export default function SentenceShuffleGame({
  onScoreChange,
  onGameOver,
  paused,
  time,
}: GameProps) {
  const gameId: GameId = 4;
  const { data, isLoading, isSuccess, isError, refetch } = useGameData(gameId);
  const submitProgressMutation = useSubmitProgress();
  const user = useSelector((state: any) => state.user.user);

  const [rounds, setRounds] = useState<SentenceShuffleItem[]>([]);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isReloading, setIsReloading] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const totalScoreRef = useRef<number>(0);
  const roundStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (data && isSuccess) {
      setRounds(data!.data.rounds);
      setIndex(0);
      setStatus("idle");
      setFeedback(null);
      setGameFinished(false);
      totalScoreRef.current = 0;
      roundStartRef.current = null;
    }
  }, [data]);

  const currentRound = rounds[index];

  const initialWords = useMemo(() => {
    if (!currentRound?.words) return [] as DraggableItem[];
    return currentRound.words.map((w) => ({ id: generateId(), value: w }));
  }, [currentRound]);

  const {
    availableItems,
    selectedSlots,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleItemSelect,
    handleDeselectItem,
  } = useDragAndDrop<DraggableItem>(
    initialWords,
    currentRound?.words?.length ?? 0,
    paused || status !== "idle",
    status
  );

  const currentGuess = selectedSlots
    .filter((s) => s !== null)
    .map((s) => s!.value)
    .join(" ");

  // --- טיפוס ברור למנוע שגיאות TypeScript ---
  const isSubmitDisabled: boolean =
    paused || selectedSlots.some((s) => s === null) || status !== "idle";

  useEffect(() => {
    if (!currentRound) return;
    roundStartRef.current = Date.now();
  }, [index, currentRound]);

  const computeRoundScore = (
    elapsedMs: number,
    correctPositions: number,
    correctTotal: number
  ) => {
    const basePerWord = 10;
    const accuracyPoints = correctPositions * basePerWord;
    const maxTimeBonus = 5;
    const idealMs = 5000;
    const timeFactor = Math.max(
      0,
      (idealMs - Math.min(elapsedMs, idealMs)) / idealMs
    );
    const timeBonus = Math.round(maxTimeBonus * timeFactor);
    const fullBonus = correctPositions === correctTotal ? 10 : 0;
    return accuracyPoints + timeBonus + fullBonus;
  };

  const handleCheck = () => {
    if (isSubmitDisabled) return;

    const correctWords = currentRound.correctSentence.split(" ");
    const guessWords = currentGuess.split(" ");
    const correctPositions = guessWords.filter(
      (w, i) => w === correctWords[i]
    ).length;
    const isCorrect = currentGuess === currentRound.correctSentence;

    const elapsed = roundStartRef.current
      ? Date.now() - roundStartRef.current
      : 0;

    const roundScore = computeRoundScore(
      elapsed,
      correctPositions,
      correctWords.length
    );
    totalScoreRef.current += roundScore;
    onScoreChange?.((prev) => prev + roundScore);

    if (isCorrect) {
      setStatus("success");
      setFeedback(`Perfect! +${roundScore} pts`);
    } else {
      setStatus("error");
      setFeedback(
        `${correctPositions} words in the correct position. +${roundScore} pts`
      );
    }

    setTimeout(() => {
      setStatus("idle");
      if (index + 1 >= rounds.length) {
        setGameFinished(true);
        submitProgressMutation.mutate({
          gameID: gameId,
          userID: user?.userId!,
          score: totalScoreRef.current,
          time: typeof time === "number" ? time : elapsed,
          rounds: index + 1,
        });
        onGameOver?.();
      }
    }, 900);
  };

  const handleNext = async () => {
    setFeedback(null);
    setStatus("idle");

    if (index + 1 < rounds.length) {
      setIndex((i) => i + 1);
      return;
    }

    setIsReloading(true);
    try {
      const newData = await refetch();
      const newRounds: SentenceShuffleItem[] = newData?.data?.data.rounds || [];
      if (newRounds.length) {
        setRounds(newRounds);
        setIndex(0);
        setGameFinished(false);
        totalScoreRef.current = 0;
        onScoreChange?.(() => 0);
      }
    } catch (err) {
      console.error("Failed to refetch rounds:", err);
    } finally {
      setIsReloading(false);
    }
  };

  const buttonClass: string = useMemo(() => {
    if (isSubmitDisabled) return "bg-gray-400 cursor-not-allowed";
    switch (status) {
      case "success":
        return "bg-green-600 hover:bg-green-700";
      case "error":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  }, [isSubmitDisabled, status]);

  if (isLoading || isReloading)
    return <p className="text-center mt-10">Loading...</p>;
  if (isError || rounds.length === 0)
    return <p className="text-center mt-10">No rounds available.</p>;

  return (
    <div className="sentence-shuffle-game text-center max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-xl font-sans">
      <h3 className="text-xl font-semibold mb-6 text-slate-900">
        Round {index + 1} of {rounds.length}
      </h3>

      <div className="mb-6 grid grid-cols-1">
        <div className="flex flex-wrap justify-center gap-3">
          {selectedSlots.map((slot, i) => (
            <motion.div
              key={slot?.id ?? `slot-${i}`}
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`min-w-[90px] px-3 py-2 rounded-lg border-2 text-lg font-semibold cursor-pointer select-none flex items-center justify-center text-center
                ${
                  status === "success"
                    ? "bg-emerald-100 border-emerald-500 text-emerald-800"
                    : status === "error"
                    ? "bg-red-100 border-red-500 text-red-800"
                    : slot
                    ? "bg-white border-slate-500 text-slate-800"
                    : "bg-gray-200 border-gray-300 text-gray-500"
                }`}
              onDrop={(e) => handleDrop(e, i)}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => slot && handleDeselectItem(slot, i)}
            >
              {slot?.value}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-3">
          <AnimatePresence>
            {availableItems.map((item) => {
              const isDragged = draggedItem?.id === item.id;
              return (
                <motion.button
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: isDragged ? 1.06 : 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  className={`px-4 py-2 rounded-lg border-2 text-lg font-semibold transition-transform duration-150 select-none cursor-grab ${
                    isDragged ? "shadow-lg" : ""
                  }`}
                  draggable={!paused}
                  disabled={paused}
                  onClick={() => handleItemSelect(item)}
                  onDragStart={(e) => handleDragStart(e as any, item)}
                  onDragEnd={handleDragEnd}
                >
                  {item.value}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <p className="mb-3 text-lg text-slate-900">
        Your sentence: <strong>{currentGuess || "(empty)"}</strong>
      </p>
      {feedback && (
        <p
          className={`mb-3 text-lg font-medium ${
            status === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {feedback}
        </p>
      )}

      <div className="space-y-3">
        <button
          className={`w-full py-3 rounded-lg text-white font-bold transition-colors duration-300 ${buttonClass}`}
          disabled={isSubmitDisabled}
          onClick={handleCheck}
        >
          {status === "success"
            ? "CORRECT! 🎉"
            : status === "error"
            ? "WRONG ❌"
            : "Check"}
        </button>

        {(status !== "idle" || gameFinished) && (
          <button
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            onClick={handleNext}
          >
            {index + 1 < rounds.length
              ? "Next Round"
              : gameFinished
              ? "Start New Round"
              : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
