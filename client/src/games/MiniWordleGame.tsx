"use client";
import MiniWordle from "./mini-wordle/MiniWordle";
import { GameProps } from "@/components/common/GameLayout";
import { useGameData } from "@/hooks/useGameData";
import { GameId } from "@/types";

export default function MiniWordleGame({ onScoreChange, onGameOver, paused }: GameProps) {
    const gameId: GameId = 6; 
    const { data, isLoading, isError } = useGameData(gameId);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data?.data) return <p>No data available.</p>;

    const miniWordleModel = {
        targetWord: data.data.data.targetWord,
        wordLength: data.data.data.wordLength,
        id: data.data.data.id,
    };

    return (
        <MiniWordle
            wordLength={miniWordleModel.wordLength}
            targetWord={miniWordleModel.targetWord}
            paused={paused}
            onScoreChange={onScoreChange}
            onGameOver={onGameOver}
        />
    );
}
