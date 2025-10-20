// 'use client';
// import useGameState from '@/hooks/useGameState';
// import useGameTimer from '@/hooks/useGameTimer';
// import React, { useEffect, useState } from 'react';

// interface TimerProps {
//     running: boolean;       // if the game is active
//     gameOver: boolean;      // if the game is finish
//     onFinish?: (timeMs: number) => void; // function active when the game over
//     reset?: boolean;            // to reset
// }

// // export default function Timer({ running, gameOver, onFinish, reset }: TimerProps) {
// //     const [timeMs, setTimeMs] = useState(0);

// //     const { time, start, stop, reset: resetTimer } = useGameTimer()

// //     useEffect(() => {
// //         if (!running || gameOver) return; // רק רץ כשrunning והמשחק לא נגמר

// //         const interval = setInterval(() => {
// //             setTimeMs(prev => prev + 1000);
// //         }, 1000);

// //         return () => clearInterval(interval);
// //     }, [running, gameOver]);

// //     // איפוס כשמתחילים משחק חדש
// //     useEffect(() => {
// //         if (reset) {
// //             setTimeMs(0);
// //         }
// //     }, [reset]);

// //     // שולח את הזמן הסופי רק כשמשחק נגמר
// //     useEffect(() => {
// //         if (gameOver && onFinish) {
// //             onFinish(timeMs);
// //         }
// //     }, [gameOver, timeMs]);

// //     const minutes = Math.floor(timeMs / 60000);
// //     const seconds = Math.floor(timeMs / 1000);

// //     console.log("minuts: " + minutes);
// //     console.log("seconds: " + seconds);

// //     return (
// //         <div className="font-mono text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:scale-105 transition-transform">
// //             {minutes}:{seconds < 10 ? '0' + seconds : seconds}
// //         </div>
// //     );
// // };


// export default function Timer({ running, gameOver, onFinish, reset }: TimerProps) {
//     const { time, start, stop, reset: resetTimer } = useGameTimer(0);

//     useEffect(() => {
//         if (running) start();
//         else stop();
//     }, [running]);

//     useEffect(() => {
//         if (reset) resetTimer(0);
//     }, [reset]);

//     useEffect(() => {
//         if (gameOver && onFinish) onFinish(time);
//     }, [gameOver, time]);

//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;

//     return (
//         <div className="font-mono text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow">
//             {minutes}:{seconds < 10 ? "0" + seconds : seconds}
//         </div>
//     );
// }

"use client";
import useGameTimer from "@/hooks/useGameTimer";
import { useEffect } from "react";

interface TimerProps {
    running: boolean;
    gameOver: boolean;
    onFinish?: (timeSec: number) => void;
    reset?: boolean;
}

export default function Timer({ running, gameOver, onFinish, reset }: TimerProps) {
    const { time, start, stop, reset: resetTimer } = useGameTimer(0);

    // שליטה בהפעלה ועצירה
    useEffect(() => {
        if (running) start();
        else stop();
    }, [running]);

    // איפוס
    useEffect(() => {
        if (reset) resetTimer(0);
    }, [reset]);

    // כשהמשחק נגמר - שלח זמן סופי
    useEffect(() => {
        if (gameOver && onFinish) {
            stop();
            onFinish(time);
        }
    }, [gameOver, time]);

    console.log("time"+time);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    console.log(minutes);
    console.log(seconds);
    
    return (
        <div className="font-mono text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow">
            {minutes}:{seconds}
        </div>
    );
}
