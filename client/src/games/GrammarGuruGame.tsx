'use client';
import { useState, useEffect, useRef } from "react";
import { GameProps } from "@/components/common/GameLayout";
import axios from "axios";
import Button from "@/components/ui/Button";

type Question = {
  id: number;
  sentences: string[];
  correctIndex: number;
};

export default function GrammarGuruGame({ onScoreChange, onGameOver, paused }: GameProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    const fetchQuestions = async () => {
      try {
        hasFetchedRef.current = true;
        const res = await axios.get("https://localhost:7292/api/v1/GeneralGame/9/data");
        setQuestions(res.data.data.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

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

  if (completed) {
    return <p className="text-xl font-semibold text-green-600">All questions completed!</p>;
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">
        Question {currentIndex + 1} of {questions.length}
      </h3>

      {questions.length > 0 ? (
        <div className="mb-4 flex flex-col gap-2">
          {questions[currentIndex].sentences.map((s, i) => (
            <div key={i} className="relative">
              <Button
                onClick={() => handleSelect(i)}
                disabled={paused || selected !== null}
                className={`btn w-full px-4 py-2 rounded-lg text-white transition-all ${
                  selected === null
                    ? "bg-blue-500 hover:bg-blue-600"
                    : i === questions[currentIndex].correctIndex
                    ? "bg-green-500"
                    : i === selected
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {s}
              </Button>
              {selected !== null && i === selected && feedback && (
                <span className="btn absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                  {feedback}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading questions...</p>
      )}

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
