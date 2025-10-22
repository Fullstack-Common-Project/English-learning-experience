"use-client";
import { useState, useEffect, useRef } from "react";
import { GameProps } from "@/components/common/GameLayout";
import { motion } from "framer-motion";
import axios from "axios";

interface DoubleVisionOption {
    imageUrl: string;
    label: string;
}

interface DoubleVisionData {
    mainWord: string;
    options: DoubleVisionOption[];
    correctIndex: number;
}


export default function DoubleVisionGame({ onScoreChange, onGameOver, paused }: GameProps) {

    const [data, setData] = useState<DoubleVisionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const hasFetchedRef = useRef(false);

    const url = 'https://english-platform-testpnoren.s3.us-east-1.amazonaws.com/'
    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        const fetchData = async () => {
            try {
                // כאן אנחנו שולחים בקשה ל-API הרלוונטי שלך
                const response = await axios.get("https://localhost:7292/api/v1/GeneralGame/12/data");
                // כאן תלוי איך ה-API שלך מחזיר את הנתונים
                const gameData: DoubleVisionData = response.data.data.data;
                setData(gameData);
            } catch (error) {
                console.error("Failed to fetch DoubleVision data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleClick = (index: number) => {
        if (paused || selectedIndex !== null) return;
        setSelectedIndex(index);
        const correct = index === data?.correctIndex;
        setIsCorrect(correct);

        if (correct) onScoreChange?.(10);
        else onScoreChange?.(0);

        setTimeout(() => {
            onGameOver?.();
            setSelectedIndex(null);
            setIsCorrect(null);
        }, 1000);
    };


    if (loading) return <p>Loading...</p>;
    if (!data) return <p>Error loading game data</p>;

console.log(data);

    return (
        <div className="doublevision">
            <h2 className="doublevision__word">{data.mainWord}</h2>
            <div className="doublevision__grid">
                {data?.options?.map((option, idx) => (
                    <motion.img
                        key={idx}
                        src={url + option.imageUrl}
                        alt={option.label}
                        className={`doublevision__option ${selectedIndex === idx && isCorrect ? "correct" : ""
                            } ${selectedIndex === idx && isCorrect === false ? "wrong" : ""}`}
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        onClick={() => handleClick(idx)}
                    />
                ))}
            </div>
        </div>
    );

}