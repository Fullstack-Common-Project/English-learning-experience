"use client";
import { useState, useEffect, useRef } from "react";
import MiniWordle from "./mini-wordle/MiniWordle";
import { GameProps } from "@/components/common/GameLayout";
import axios from "axios";


interface MiniWordleModel {
    targetWord: string;
    wordLength: number;
    id: number | null;
}

export default function MiniWordleGame({ onScoreChange, onGameOver, paused }: GameProps) {
    const [miniWordleModel, setMiniWordleModel] = useState<MiniWordleModel | null>(null);
    const [loading, setLoading] = useState(true);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        const fetchData = async () => {
            try {
                // setMiniWordleModel({
                //     targetWord: "APPL",
                //     wordLength: 4,
                //     id: 1
                // });
                const response = await axios.get("https://localhost:7292/api/v1/GeneralGame/6/data");
                const data = response.data.data.data;
                console.log(data)
                setMiniWordleModel({ targetWord: data.targetWord, wordLength: data.wordLength, id: data.id });
            } catch (error) {
                console.error("Failed to fetch MiniWordle data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!miniWordleModel) return <p>No data available.</p>;

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

