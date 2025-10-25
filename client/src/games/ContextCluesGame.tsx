"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GameProps } from "@/components/common/GameLayout";
import { useGameData } from "@/hooks/useGameData";

interface ContextCluesModel {
  id: number;
  sentence: string;
  options: string[];
  correctIndex: number;
}

export default function ContextCluesGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const gameId = 15;
  const { data, isLoading, isError, refetch } = useGameData(gameId);
  const [question, setQuestion] = useState<ContextCluesModel | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const hasFetchedRef = useRef(false);

  // fetch הדאטה כמו MiniWordleGame
  useEffect(() => {
    if (!data || hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchedQuestion: ContextCluesModel = data?.data?.data;
    if (fetchedQuestion) setQuestion(fetchedQuestion);
  }, [data]);

  const handleSelectOption = async (index: number) => {
    if (paused || selectedOption !== null || !question) return;

    setSelectedOption(index);

    if (index === question.correctIndex) {
      onScoreChange?.((prev) => prev + 10);
    } else {
      onScoreChange?.((prev) => prev - 5);
    }

    setTimeout(async () => {
      setSelectedOption(null);
      const newData = await refetch();
      const fetchedQuestion = newData?.data?.data.data;
      if (fetchedQuestion) setQuestion(fetchedQuestion);
    }, 1000);
  };

  if (isLoading) return <p>טוען נתונים מהשרת...</p>;
  if (isError) return <p>שגיאה בטעינת הנתונים</p>;
  if (!question) return <p>אין נתונים להצגה</p>;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="panel text-center max-w-2xl mx-auto"
    >
      <h3 className="game-card__title text-indigo-400 mb-4">
        שאלה
      </h3>

      <p className="mb-6 text-lg text-slate-200">
        {question.sentence.replace("___", "_____")}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctIndex;
          const isSelected = index === selectedOption;
          const showResult = selectedOption !== null;

          let buttonClass = "btn-secondary font-semibold transition-all duration-200";

          if (showResult) {
            if (isCorrect)
              buttonClass =
                "btn-primary bg-green-600 hover:bg-green-500 shadow-[0_0_15px_3px_rgba(34,197,94,0.7)]";
            else if (isSelected)
              buttonClass =
                "btn-primary bg-red-600 hover:bg-red-500 shadow-[0_0_15px_3px_rgba(239,68,68,0.7)]";
            else buttonClass = "btn-secondary opacity-50";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectOption(index)}
              disabled={paused || selectedOption !== null}
              className={buttonClass}
            >
              {option}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

