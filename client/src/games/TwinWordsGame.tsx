"use client";
import { useState, useEffect } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { GameId } from "@/types";
import { useGameData } from "@/hooks/useGameData";
import { TwinWordsSingleQuestion } from "@/types/gamesTypes/TwinWords";
import { useSelector } from "react-redux";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import Button from "@/components/ui/Button";
import clsx from "clsx";

export default function TwinWordsGame({ onScoreChange, onGameOver, paused, time }: GameProps) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const gameId: GameId = 10;
  const { data, isLoading, isError, refetch } = useGameData(gameId);
  const user = useSelector((state: any) => state.user.user);
  const submitProgressMutation = useSubmitProgress();
  const { refetch: refetchLeaderboard } = useLeaderboard(gameId, {
    refetchInterval: 5000,
  });
  const items: TwinWordsSingleQuestion[] = Array.isArray(data?.data?.data?.items)
    ? (data!.data.data.items as TwinWordsSingleQuestion[])
    : [];
  const currentQuestion = items[currentIndex];
  const progress = ((currentIndex) / items.length) * 100;



  useEffect(() => {
    refetch();
  }, []);


  const handleSelect = (index: number) => {
    if (!currentQuestion || paused || isWaiting || completed) return;

    setSelectedIndex(index);
    setIsWaiting(true);

    const isCorrect = checkAnswer(index, currentQuestion.correctIndex);
    handleFeedback(isCorrect, currentQuestion.correctIndex);
    updateScore(isCorrect);

    setTimeout(() => moveToNextQuestion(isCorrect), 1200);
  };

  const checkAnswer = (selected: number, correct: number) => selected === correct;

  const handleFeedback = (isCorrect: boolean, correctIndex: number) => {
    setFeedback(isCorrect ? "correct" : "wrong");
    if (!isCorrect) setHighlightIndex(correctIndex);
  };

  const updateScore = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
      onScoreChange?.((prev) => (prev ?? 0) + 1);
    } else {
      onScoreChange?.((prev) => (prev ?? 0) - 1);
    }
  };

  const moveToNextQuestion = (isCorrect: boolean) => {
    setSelectedIndex(null);
    setHighlightIndex(null);
    setFeedback(null);
    setIsWaiting(false);

    const nextIndex = currentIndex + 1;
    if (nextIndex < items.length) {
      setCurrentIndex(nextIndex);
    } else {
      endGame();
    }
  };

  const endGame = async () => {
    setCompleted(true);
    onGameOver?.();

    submitProgressMutation.mutate({
      gameID: gameId,
      userID: user?.userId!,
      score,
      time: time ?? 0,
      rounds: items.length,
    });

    await refetchLeaderboard();
  };

  const restartGame = async () => {
    setCompleted(false);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setHighlightIndex(null);
    setIsWaiting(false);

    const newData = await refetch();
    if (!newData?.data) return;
  };

  const renderOptionButton = (option: string, index: number) => {
    const bgClass = getButtonClass(index);
    return (
      <Button
        key={index}
        onClick={() => handleSelect(index)}
        disabled={paused || isWaiting}
        className={clsx(
          "px-4 py-2 rounded text-white transition-all duration-150 transform disabled:opacity-50",
          getButtonClass(index) // מוסיף את הירוק/אדום/הבהוב
        )}
      >
        {option}
      </Button>

    );
  };

  const getButtonClass = (index: number) => {
    if (feedback === "correct" && selectedIndex === index) return "bg-green-500";
    if (feedback === "wrong") {
      if (selectedIndex === index) return "bg-red-500";
      if (highlightIndex === index) return "bg-green-500 animate-pulse";
    }
    return "bg-blue-500 hover:scale-105";
  };

  if (isLoading) return <p>loading game...</p>;
  if (isError || items.length === 0) return <p>error in loading game.</p>;
  if (completed) return <p className="twinwords__completed">🎉 All questions completed!</p>;


  return (
    <>

      <div
        className="progress-bar"
        style={{
          width: "100%",
          background: "#eee",
          height: "10px",
          borderRadius: "5px",
          marginBottom: "15px",
        }}
      >
        <div
          className="progress-bar__fill"
          style={{
            width: `${progress}%`,
            background: "#4caf50",
            height: "100%",
            borderRadius: "5px",
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <div className="twinwords">
        <h3 className="twinwords__title">
          Word {currentIndex + 1} of {items.length}
        </h3>

        <h2 className="twinwords__word">{currentQuestion.word}</h2>

        <div className="twinwords__options grid md:grid-cols-2 gap-3">
          {currentQuestion.options.map(renderOptionButton)}
        </div>

        {feedback && (
          <p className="twinwords__feedback text-center mt-2 text-xl font-bold">
            {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
          </p>
        )}
      </div>
    </>
  );
}
