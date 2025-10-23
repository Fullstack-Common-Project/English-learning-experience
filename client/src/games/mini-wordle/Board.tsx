// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";

// interface MiniWordleProps {
//     wordLength: number;
//     targetWord: string;
//     maxGuesses?: number;
//     paused?: boolean;
//     onScoreChange?: (callback: (prev: number) => number) => void;
//     onGameOver?: () => void;
// }

// const colors = {
//     correct: "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30",
//     present: "bg-amber-500 text-white shadow-lg shadow-amber-500/30",
//     absent: "bg-slate-700/50 text-slate-300",
//     empty: "bg-slate-800/40 border border-slate-700",
//     filled: "bg-slate-800/60 border border-indigo-400 text-white scale-105"
// };

// const KEYBOARD_LAYOUT = [
//     ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
//     ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
//     ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
// ];

// // מחשב צבעים לפי Wordle
// const getRowColors = (guess: string[], solution: string) => {
//     const colors: string[] = Array(guess.length).fill("absent");
//     const solutionLetters = solution.toUpperCase().split("");

//     // קודם ירוקים
//     guess.forEach((letter, idx) => {
//         if (solutionLetters[idx] === letter) {
//             colors[idx] = "correct";
//             solutionLetters[idx] = "";
//         }
//     });

//     // אחר כך כתומים
//     guess.forEach((letter, idx) => {
//         if (colors[idx] === "correct") return;
//         const foundIdx = solutionLetters.indexOf(letter);
//         if (foundIdx !== -1) {
//             colors[idx] = "present";
//             solutionLetters[foundIdx] = "";
//         }
//     });

//     return colors;
// };

// export default function MiniWordle({
//     wordLength,
//     targetWord,
//     maxGuesses = 6,
//     paused = false,
//     onScoreChange,
//     onGameOver
// }: MiniWordleProps) {

//     const [board, setBoard] = useState<string[][]>(
//         Array.from({ length: maxGuesses }, () => Array(wordLength).fill(""))
//     );
//     const [rowColors, setRowColors] = useState<string[][]>(
//         Array.from({ length: maxGuesses }, () => Array(wordLength).fill("empty"))
//     );
//     const [currentRow, setCurrentRow] = useState(0);
//     const [currentCol, setCurrentCol] = useState(0);
//     const [keyboardColors, setKeyboardColors] = useState<Record<string, string>>({});
//     const [shake, setShake] = useState(false);
//     const [revealingRow, setRevealingRow] = useState(-1);
//     const [completed, setCompleted] = useState(false);

//     const boardRef = useRef(board);
//     const currentRowRef = useRef(currentRow);
//     const currentColRef = useRef(currentCol);
//     const keyboardColorsRef = useRef(keyboardColors);
//     const revealingRowRef = useRef(revealingRow);

//     useEffect(() => { boardRef.current = board; }, [board]);
//     useEffect(() => { currentRowRef.current = currentRow; }, [currentRow]);
//     useEffect(() => { currentColRef.current = currentCol; }, [currentCol]);
//     useEffect(() => { keyboardColorsRef.current = keyboardColors; }, [keyboardColors]);
//     useEffect(() => { revealingRowRef.current = revealingRow; }, [revealingRow]);

//     // פונקציה לחישוב ניקוד לפי מספר הניחושים (תמיד ערך שונה)
//     const calculateScore = (guessNumber: number, maxGuesses = 6, maxScore = 10) => {
//         const score = Math.round(maxScore - ((guessNumber - 1) * (maxScore / maxGuesses)));
//         return Math.max(score, 1); // תמיד לפחות נקודה אחת
//     };

//     // הקלדת אות
//     const onType = (letter: string) => {
//         if (paused || completed || revealingRowRef.current !== -1) return;
//         if (currentColRef.current >= wordLength) return;

//         const newBoard = boardRef.current.map(r => [...r]);
//         newBoard[currentRowRef.current][currentColRef.current] = letter.toUpperCase();
//         setBoard(newBoard);
//         setCurrentCol(currentColRef.current + 1);
//     };

//     // מחיקת אות
//     const onDelete = () => {
//         if (paused || completed || currentColRef.current === 0 || revealingRowRef.current !== -1) return;
//         const newBoard = boardRef.current.map(r => [...r]);
//         newBoard[currentRowRef.current][currentColRef.current - 1] = "";
//         setBoard(newBoard);
//         setCurrentCol(currentColRef.current - 1);
//     };

//     // בדיקת ניחוש
//     const onSubmit = () => {
//         if (paused || completed || revealingRowRef.current !== -1) return;
//         if (currentColRef.current < wordLength) {
//             setShake(true);
//             setTimeout(() => setShake(false), 500);
//             return;
//         }

//         const guess = boardRef.current[currentRowRef.current];
//         const rowColorResult = getRowColors(guess, targetWord);

//         // תחילת אנימציה
//         setRevealingRow(currentRowRef.current);

//         // צביעת האריחים בהדרגה
//         rowColorResult.forEach((color, idx) => {
//             setTimeout(() => {
//                 setRowColors(prev => {
//                     const updated = prev.map(r => [...r]);
//                     updated[currentRowRef.current][idx] = color;
//                     return updated;
//                 });
//             }, idx * 200);
//         });

//         // אחרי שהשורה הסתיימה
//         setTimeout(() => {
//             const newKeyboardColors = { ...keyboardColorsRef.current };
//             guess.forEach((letter, idx) => {
//                 const c = rowColorResult[idx];
//                 if (!newKeyboardColors[letter] || c === "correct" || (c === "present" && newKeyboardColors[letter] !== "correct")) {
//                     newKeyboardColors[letter] = c;
//                 }
//             });
//             setKeyboardColors(newKeyboardColors);

//             if (guess.join("") === targetWord.toUpperCase()) {

//                 if (guess.join("").toUpperCase() === targetWord.toUpperCase()) {
//                     const guessesUsed = currentRowRef.current + 1; // כמה ניחושים השתמשו עד עכשיו
//                     const scoreToAdd = calculateScore(guessesUsed);

//                     onScoreChange?.(prev => prev + scoreToAdd);

//                     setCompleted(true);
//                     onGameOver?.();
//                 }

//                 // onScoreChange?.(prev => prev + 10);
//                 setCompleted(true);
//                 onGameOver?.();
//             } else if (currentRowRef.current + 1 >= maxGuesses) {
//                 alert("נגמר המשחק 😢 המילה הייתה: " + targetWord);
//                 setCompleted(true);
//                 onGameOver?.();
//             } else {
//                 setCurrentRow(currentRowRef.current + 1);
//                 setCurrentCol(0);
//             }
//             setRevealingRow(-1);
//         }, wordLength * 220 + 300);
//     };

//     // מאזין למקלדת
//     useEffect(() => {
//         const handleKey = (e: KeyboardEvent) => {
//             const key = e.key.toUpperCase();
//             if (key === "ENTER") onSubmit();
//             else if (key === "BACKSPACE") onDelete();
//             else if (/^[A-Z]$/.test(key)) onType(key);
//         };
//         window.addEventListener("keydown", handleKey);
//         return () => window.removeEventListener("keydown", handleKey);
//     }, []);

//     // מצב אריח
//     const getTileState = (row: number, col: number) => {
//         if (row < currentRow) return rowColors[row][col];
//         if (row === currentRow && board[row][col]) return "filled";
//         return "empty";
//     };

//     if (completed)
//         return <p className="mini-wordle__completed text-xl font-bold mt-4">🎉 המשחק נגמר!</p>;

//     return (
//         <div className="mini-wordle flex flex-col items-center mt-6">
//             <p className="text-lg font-medium mb-2">
//                 Guess {currentRow + 1} of {maxGuesses}
//             </p>

//             {/* לוח המשחק */}
//             <div className="flex flex-col gap-2">
//                 {board.map((row, rowIndex) => (
//                     <motion.div
//                         key={rowIndex}
//                         className={`flex gap-2 justify-center ${shake && rowIndex === currentRow ? "animate-shake" : ""}`}
//                     >
//                         {row.map((letter, colIndex) => {
//                             const colorKey = rowColors[rowIndex][colIndex] || getTileState(rowIndex, colIndex);
//                             const isRevealing = revealingRow === rowIndex;
//                             return (
//                                 <motion.div
//                                     key={colIndex}
//                                     className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl font-bold text-2xl border-2 ${colors[colorKey as keyof typeof colors]}`}
//                                     initial={{ rotateX: 0 }}
//                                     animate={isRevealing ? { rotateX: [0, 90, 0], transition: { delay: colIndex * 0.15, duration: 0.4 } } : { rotateX: 0 }}
//                                     style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
//                                 >
//                                     {letter}
//                                 </motion.div>
//                             );
//                         })}
//                     </motion.div>
//                 ))}
//             </div>

//             {/* מקלדת */}
//             <div className="flex flex-col items-center gap-1.5 mt-6">
//                 {KEYBOARD_LAYOUT.map((row, i) => (
//                     <div key={i} className="flex gap-1.5">
//                         {row.map((key) => {
//                             const color = keyboardColors[key] || "default";
//                             const isSpecial = key === "ENTER" || key === "⌫";
//                             return (
//                                 <motion.button
//                                     key={key}
//                                     onClick={() => {
//                                         if (paused || completed || revealingRowRef.current !== -1) return;
//                                         if (key === "ENTER") onSubmit();
//                                         else if (key === "⌫") onDelete();
//                                         else onType(key);
//                                     }}
//                                     whileTap={{ scale: 0.9 }}
//                                     whileHover={{ scale: 1.05 }}
//                                     className={`rounded-xl font-bold transition ${isSpecial ? "px-3 sm:px-4 text-xs sm:text-sm" : "w-8 sm:w-10"
//                                         } h-12 sm:h-14 flex items-center justify-center ${color === "correct"
//                                             ? "bg-emerald-600 text-white"
//                                             : color === "present"
//                                                 ? "bg-amber-500 text-white"
//                                                 : color === "absent"
//                                                     ? "bg-slate-700/50 text-slate-400"
//                                                     : "bg-slate-800/60 text-white hover:bg-slate-700/60 border border-white/10"
//                                         }`}
//                                 >
//                                     {key}
//                                 </motion.button>
//                             );
//                         })}
//                     </div>
//                 ))}
//             </div>

//             {/* shake animation */}
//             <style jsx>{`
//         @keyframes shake {
//           0%,100% { transform: translateX(0); }
//           25% { transform: translateX(-8px); }
//           75% { transform: translateX(8px); }
//         }
//         .animate-shake { animation: shake 0.4s ease-in-out; }
//       `}</style>
//         </div>
//     );
// }



"use client";
import { motion } from "framer-motion";
import Tile from "./Tile";

interface BoardProps {
    board: string[][];
    rowColors: string[][];
    currentRow: number;
    shake: boolean;
    revealingRow: number;
}

const sanitizeColorKey = (color: string): "correct" | "present" | "absent" | "empty" | "filled" => {
    if (["correct", "present", "absent", "empty", "filled"].includes(color)) {
        return color as "correct" | "present" | "absent" | "empty" | "filled";
    }
    return "empty";
};


export default function Board({ board, rowColors, currentRow, shake, revealingRow }: BoardProps) {


    
    const getTileState = (row: number, col: number) => {
        if (row < currentRow) return rowColors[row][col];
        if (row === currentRow && board[row][col]) return "filled";
        return "empty";
    };

    

    return (
        <div className="flex flex-col gap-2">
            {board.map((row, rowIndex) => (
                <motion.div
                    key={rowIndex}
                    className={`flex gap-2 justify-center ${shake && rowIndex === currentRow ? "animate-shake" : ""}`}
                >

                    {row.map((letter, colIndex) => (
                        <Tile
                            key={colIndex}
                            letter={letter}
                            colorKey={sanitizeColorKey(rowColors[rowIndex][colIndex] || getTileState(rowIndex, colIndex))}
                            isRevealing={revealingRow === rowIndex}
                            revealDelay={colIndex * 0.15}
                        />
                    ))}

                </motion.div>
            ))}

            <style jsx>{`
                @keyframes shake {
                  0%,100% { transform: translateX(0); }
                  25% { transform: translateX(-8px); }
                  75% { transform: translateX(8px); }
                }
                .animate-shake { animation: shake 0.4s ease-in-out; }
            `}</style>
        </div>
    );
}
