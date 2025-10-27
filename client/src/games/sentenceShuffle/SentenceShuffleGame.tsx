"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useGameData } from "@/hooks/useGameData";
import { GameProps } from "@/components/common/GameLayout";
import { SentenceShuffleItem } from "@/types/gamesTypes/SentenceShuffle";
import useGameTimer from "@/hooks/useGameTimer";
import { useSelector } from "react-redux";
// ...existing code...
import SentenceBoard from "./SentenceBoard";
import WordDrawer from "./WordDrawer";
import SubmitButton from "./SubmitButton";
import NextRoundButton from "./NextRoundButton";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";

const generateId = () => Math.floor(Math.random() * 10000).toString();

export default function SentenceShuffleGame({
  onScoreChange,
  onGameOver,
  paused,
}: GameProps) {
  const gameId = 4;
  const { data, isLoading, isError, refetch } = useGameData(gameId);
  const submitProgressMutation = useSubmitProgress();
    const user = useSelector(selectUser);
    const { timeRef, startTimer, stopTimer } = useGameTimer();
    score,
    setScore,
    const totalScore = useRef(0);

  const [sentences, setSentences] = useState<SentenceShuffleItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data?.rounds?.length) {
      setSentences(data.data.rounds);
      setCurrentIndex(0);
      setStatus("idle");
      setFeedback(null);
        startTimer();
    }
  }, [data]);

  const currentSentence = sentences[currentIndex];

  const initialWords = useMemo(() => {
    return (
      currentSentence?.words.map((word) => ({
        id: generateId(),
        value: word,
      })) || []
    );
  onScoreChange,
  onGameOver,
  paused,
  score,
  setScore,
}: GameProps & { score: number; setScore: React.Dispatch<React.SetStateAction<number>> }) {
      (w, i) => w === correctWords[i]
    ).length;
    const isCorrect = currentGuess === currentSentence.correctSentence;
  const user = useSelector((state: any) => state.user);
    if (isCorrect) {
      setFeedback(null);
      const roundScore = 10;
      totalScore.current += roundScore;
      onScoreChange?.((prev) => prev + roundScore);
    } else {
      setStatus("error");
      setFeedback(`${correctPositions} words in the correct position.`);
      const roundScore = correctPositions;
      totalScore.current += roundScore;
      onScoreChange?.((prev) => prev + roundScore);
    }
  };

  const handleNextRound = async () => {
    setStatus("idle");
    setFeedback(null);
    if (currentIndex + 1 < sentences.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      // סיום המשחק – שליחת תוצאות
        stopTimer();
      submitProgressMutation.mutate({
        gameID: gameId,
          score: totalScore.current,
        rounds: sentences.length,
          userID: user?.userId!,
          time: timeRef.current ?? 0,
      });

      onGameOver?.();
      // ריפץ לאתחול סבב חדש
      const newData = await refetch();
      setSentences(newData?.data?.data?.rounds || []);
      setCurrentIndex(0);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || sentences.length === 0) return <p>No sentences available.</p>;

  return (
    <div className="sentence-shuffle-game text-center max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-xl font-sans">
      <h3>
        Sentence {currentIndex + 1} of {sentences.length}
      </h3>

      <SentenceBoard
        initialWords={initialWords}
        status={status}
        paused={paused}
      />
      <WordDrawer initialWords={initialWords} status={status} paused={paused} />

      <SubmitButton
        currentSentence={currentSentence}
        status={status}
        onSubmit={handleSubmit}
      />
      <NextRoundButton
        showButton={status !== "idle"}
        userID: user?.user?.userId,
      />

      {feedback && (
        <p
          className={`mb-3 text-lg font-medium ${
            status === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
