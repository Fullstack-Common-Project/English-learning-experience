'use client';
import React, { useEffect, useState } from 'react';

interface TimerProps {
    running: boolean;       // if the game is active
    gameOver: boolean;      // if the game is finish
    onFinish?: (timeMs: number) => void; // function active when the game over
}

export default function Timer({ running, gameOver, onFinish }: TimerProps) {
    const [timeMs, setTimeMs] = useState(0);

    useEffect(() => {
        if (!running ) return;

        const interval = setInterval(() => {
            setTimeMs(prev => prev + 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);


    useEffect(() => {
        if (gameOver && onFinish) {
            onFinish(timeMs); // שולח את הזמן הסופי למי שקורא לרכיב
        }
    }, [gameOver, onFinish, timeMs]);

    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);

    return (
        <div className="font-mono text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:scale-105 transition-transform">
            {minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </div>
    );
};
