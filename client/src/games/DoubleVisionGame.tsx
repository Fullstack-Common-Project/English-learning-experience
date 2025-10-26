"use client";
import { useState, useEffect, useRef } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { motion } from "framer-motion";
import { GameId } from "@/types";
import { useGameData } from "@/hooks/useGameData";
import { DoubleVisionItem } from "@/types/gamesTypes/DoubleVision";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useSubmitProgress } from "@/hooks/useSubmitProgress";
import { useSelector } from "react-redux";

export default function DoubleVisionGame({ onScoreChange, onGameOver, paused, time }: GameProps) {
  const gameId: GameId = 12;

  // Hooks לטעינת הנתונים
  const { data, isLoading, isError, refetch } = useGameData(gameId, { staleTime: 0 });
  const { data: leaderboardData, refetch: refetchLeaderboard } = useLeaderboard(gameId);

  // Hook לשליחת נתוני המשחק
  const submitProgressMutation = useSubmitProgress();

  // Redux - user
  const user = useSelector((state: any) => state.user.user);

  // State למשחק
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [rounds, setRounds] = useState<DoubleVisionItem[]>([]);
  const hasFetchedRef = useRef(false);

  console.log("Leaderboard:", leaderboardData?.data.leaderboards);
  useEffect(() => {
    if (leaderboardData) {
      console.log("Leaderboard at game over:", leaderboardData.data.leaderboards);
      // או עדכני state/props כדי להציג את הלידרבורד במסך הסיום
    }
  }, [leaderboardData]);

  // Ref לשמירת הזמן המדויק
  const timeRef = useRef(time);
  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  const baseUrl = "https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/";

  // ✅ Load data פעם אחת
  useEffect(() => {
    if (!data || hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const items: DoubleVisionItem[] = data.data?.data?.items || [];
    setRounds(items);
  }, [data]);

  // ✅ הגדרת הצלילים
  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctSound.current = new Audio("/sounds/צליל הצלחה.mp3");
    wrongSound.current = new Audio("/sounds/צליל שגיאה.mp3");
  }, []);

  // פונקציה לאתחול המשחק
  const restartGame = async () => {
    setCurrentRound(0);
    setSelectedIndex(null);
    setIsCorrect(null);
    const newData = await refetch();
    const items: DoubleVisionItem[] = newData?.data?.data?.items || [];
    setRounds(items);
  };

  // פונקציה לסיום משחק + שליחת הנתונים לשרת
  const handleGameOver = () => {
    submitProgressMutation.mutate({
      gameID: gameId,
      userID: user?.userId!, // חייב להיות מזהה משתמש
      score: parseInt(localStorage.getItem("totalScore") || "0"),
      time: timeRef.current ?? 0,
      rounds: currentRound + 1,
    });

    onGameOver?.();
    restartGame();
  };

  // לחיצה על אפשרות במשחק
  const handleClick = (index: number) => {
    if (paused || selectedIndex !== null) return;

    const round = rounds[currentRound];
    const correct = index === round.correctIndex;
    setSelectedIndex(index);
    setIsCorrect(correct);

    // if (correct) {
    //   correctSound.current?.play();
    //   onScoreChange?.((prev) => prev + 10);
    // } else {
    //   wrongSound.current?.play();
    // }

    if (correct) {
      if (correctSound.current) {
        correctSound.current.pause();
        correctSound.current.currentTime = 0;
        correctSound.current.play();
      }
      onScoreChange?.((prev) => prev + 10);
    } else {
      if (wrongSound.current) {
        wrongSound.current.pause();
        wrongSound.current.currentTime = 0;
        wrongSound.current.play();
      }
    }

    // שמירה קצרה של האנימציה לפני מעבר
    setTimeout(() => {
      setSelectedIndex(null);
      setIsCorrect(null);

      if (currentRound < rounds.length - 1) {
        setCurrentRound((prev) => prev + 1);
      } else {
        handleGameOver(); // סוף המשחק
      }
    }, 800);
  };

  if (isLoading || !rounds.length) return <p>Loading game data...</p>;
  if (isError) return <p>Error loading DoubleVision game 😔</p>;

  const round = rounds[currentRound];
  const progress = ((currentRound + 1) / rounds.length) * 100;

  return (
    <div className="doublevision">
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

      <h2 className="doublevision__word">{round.mainWord}</h2>

      <div className="doublevision__grid">
        {round.options.map((option, idx) => (
          <motion.img
            key={option.label + idx}
            src={baseUrl + option.imageUrl}
            alt={option.label}
            className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
              } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""
              }`}
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
