"use client";
import { motion } from "framer-motion";

const colors = {
    correct: "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30",
    present: "bg-amber-500 text-white shadow-lg shadow-amber-500/30",
    absent: "bg-slate-700/50 text-slate-300",
    empty: "bg-slate-800/40 border border-slate-700",
    filled: "bg-slate-800/60 border border-indigo-400 text-white scale-105"
};

interface TileProps {
    letter: string;
    colorKey: keyof typeof colors;
    isRevealing?: boolean;
    revealDelay?: number;
}

export default function Tile({ letter, colorKey, isRevealing = false, revealDelay = 0 }: TileProps) {
    return (
        <motion.div
            className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl font-bold text-2xl border-2 ${colors[colorKey]}`}
            initial={{ rotateX: 0 }}
            animate={isRevealing ? { rotateX: [0, 90, 0], transition: { delay: revealDelay, duration: 0.4 } } : { rotateX: 0 }}
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        >
            {letter}
        </motion.div>
    );
}
