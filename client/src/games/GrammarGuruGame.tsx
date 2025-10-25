'use client';
import { useState, useEffect, useRef } from "react";
import { GameProps } from "@/components/common/GameLayout";
import Button from "@/components/ui/Button";
import { useGameData } from "@/hooks/useGameData";
import { GameId } from "@/types";
import { GrammarGuruData } from "@/types/GrammarGuru";

export default function GrammarGuruGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const gameId: GameId = 9;
  const { data, isSuccess, isLoading, isError } = useGameData(gameId);
  const [questions, setQuestions] = useState<GrammarGuruData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    if (isSuccess && data) {
      hasFetchedRef.current = true;
      const questions = data?.data.data.data || [];
      setQuestions(questions);
    }
  }, [isSuccess, data]);

  const handleSelect = (index: number) => {
    if (paused || completed || selected !== null) return;

    setSelected(index);
    const isCorrect = index === questions[currentIndex].correctIndex;
    setFeedback(isCorrect ? "✔" : "✖");

    if (isCorrect) {
      onScoreChange?.((prev) => prev + 10);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      setCompleted(true);
      onGameOver?.();
    }
  };

  if (isLoading) return <p className="text-gray-500">Loading questions...</p>;
  if (isError) return <p className="text-red-500">Error loading game data.</p>;
  if (!isSuccess || !questions.length) return <p className="text-gray-500">No questions loaded yet...</p>;
  if (completed) return <p className="text-xl font-semibold text-green-600">All questions completed!</p>;

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">
        Question {currentIndex + 1} of {questions.length}
      </h3>

      <div className="mb-4 flex flex-col gap-2">
        {questions[currentIndex].sentences.map((sentence, i) => {
          const isCorrect = i === questions[currentIndex].correctIndex;
          const isSelected = i === selected;
          const inlineBg =
            selected === null
              ? undefined
              : isCorrect
              ? "#10B981" // Tailwind green-500
              : isSelected
              ? "#EF4444" // Tailwind red-500
              : "#9CA3AF"; // Tailwind gray-400
          const classWhenNoSelection = "bg-blue-500 hover:bg-blue-600";
          const classWhenSelected = isCorrect ? "bg-green-500" : isSelected ? "bg-red-500" : "bg-gray-400";

          const computedClass =
            selected === null
              ? `btn w-full px-4 py-2 rounded-lg text-white transition-all ${classWhenNoSelection}`
              : `btn w-full px-4 py-2 rounded-lg text-white transition-all ${classWhenSelected}`;

          // נעביר disabled אחרי בחירה כדי למנוע קליקים נוספים ולהבהיר מצב
          const isDisabled = paused || selected !== null;

          return (
            <div key={i} className="relative">
              <Button
                onClick={() => handleSelect(i)}
                disabled={isDisabled}
                // מצמידים both את המחלקות ואת ה־style inline כאשר נבחרה תשובה כדי "לנעול" את הצבע
                className={computedClass}
                style={inlineBg ? { backgroundColor: inlineBg } : undefined}
              >
                {sentence}
              </Button>

              {/* סימון ויזואלי */}
              {selected !== null && (
                <>
                  {isSelected && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                      {feedback}
                    </span>
                  )}
                  {/* אם אנחנו לא ה־selected אבל זה התשובה הנכונה, נראה ✔ בצבע ירוק */}
                  {isCorrect && !isSelected && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-green-700">
                      ✔
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {selected !== null && (
        <Button
          onClick={handleNext}
          className="btn px-6 py-3 rounded-xl shadow text-white bg-green-500 hover:bg-green-600"
        >
          Next
        </Button>
      )}
    </div>
  );
}
