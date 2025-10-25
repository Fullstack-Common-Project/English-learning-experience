"use client";
import { motion } from "framer-motion";

const KEYBOARD_LAYOUT = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];

interface KeyboardProps {
    onType: (letter: string) => void;
    onDelete: () => void;
    onSubmit: () => void;
    keyboardColors: Record<string, string>;
    disabled?: boolean;
}

export default function Keyboard({ onType, onDelete, onSubmit, keyboardColors, disabled = false }: KeyboardProps) {
    return (
        <div className="flex flex-col items-center gap-1.5 mt-6">
            {KEYBOARD_LAYOUT.map((row, i) => (
                <div key={i} className="flex gap-1.5">
                    {row.map((key) => {
                        const color = keyboardColors[key] || "default";
                        const isSpecial = key === "ENTER" || key === "⌫";

                        return (
                            <motion.button
                                key={key}
                                onClick={() => {
                                    if (disabled) return;
                                    if (key === "ENTER") onSubmit();
                                    else if (key === "⌫") onDelete();
                                    else onType(key);
                                }}
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                className={`rounded-xl font-bold transition ${isSpecial ? "px-3 sm:px-4 text-xs sm:text-sm" : "w-8 sm:w-10"
                                    } h-10 sm:h-12 flex items-center justify-center ${color === "correct"
                                        ? "bg-emerald-600 text-white"
                                        : color === "present"
                                            ? "bg-amber-500 text-white"
                                            : color === "absent"
                                                ? "bg-slate-700/50 text-slate-400"
                                                : "bg-slate-800/60 text-white hover:bg-slate-700/60 border border-white/10"
                                    }`}
                            >
                                {key}
                            </motion.button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
