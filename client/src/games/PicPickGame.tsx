"use client";
import { useState, useEffect, useRef } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { useGameData } from "@/hooks/useGameData";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";
import { GameId } from "@/types";
import { PicPickItem } from "@/types/PicPick";

export default function PicPickGame({ onScoreChange, onGameOver, paused }: GameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [questions, setQuestions] = useState<PicPickItem[]>([]);

    const gameId: GameId = 17; 
    const { data, isLoading, isError, refetch } = useGameData(gameId);
    const hasFetchedRef = useRef(false);
    const baseUrl = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

    useEffect(() => {
      const items: PicPickItem[] = data?.data?.data?.items || [];
      if (!items.length || hasFetchedRef.current) return;
      hasFetchedRef.current = true;
      setQuestions(items);
    }, [data]);

    const { data: leaderboard, refetch: refetchLeaderboard } = useLeaderboard(gameId, {
      refetchInterval: 10000, 
    });

    const submitProgress = useSubmitProgress();
    
    if (isLoading || !questions.length) return <p>Loading...</p>;
    if (isError || !data) return <p>No data available.</p>;

    const currentItem = questions[currentIndex];

    const handleFinish = async () => {
        await submitProgress.mutateAsync({
            gameId,
            playerName: "שירה",
            score,
            time,
            roundsCompleted: questions.length,
        });
        refetchLeaderboard();
        hasFetchedRef.current = false;
        setCurrentIndex(0);
        setCompleted(false);
        setScore(0);
        setQuestions([]);
        refetch();
    }

    const handleAnswer = (index: number) => {
        if (paused || completed || !currentItem) return;

        if (index === currentItem.correctIndex) {
            onScoreChange?.((prev) => prev + 10);
        }
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
        } else {
            setCompleted(true);
            onGameOver?.();
            handleFinish();
        }
    };

    if (completed) {
        return <p className="sentence-game__completed">כל התמונות הושלמו! 👏!</p>;
    }

    return (
        <div className="sentence-game">
            <h3 className="sentence-game__title">
                Picture {currentIndex + 1} of {questions.length}
            </h3>

            <div className="sentence-game__image">
                <img src={baseUrl + currentItem.imageUrl} alt="Game Image" className="rounded-2xl" />
            </div>

            <div className="sentence-game__words grid md:grid-cols-2 gap-3">
                {currentItem.sentences.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={paused}
                        className={`btn-primary sentence-game__word ${paused ? "sentence-game__word--disabled" : ""}`}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
}
