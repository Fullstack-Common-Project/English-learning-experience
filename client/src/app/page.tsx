"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="page-container flex flex-col items-center text-center">
      <motion.h1
        className="section-title text-indigo-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to Game-English!
      </motion.h1>

      <motion.p
        className="max-w-2xl text-slate-300 text-lg md:text-xl leading-relaxed mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Dive into an exciting journey of learning English through{" "}
        <span className="text-indigo-400 font-medium">
          interactive games and challenges
        </span>
        . Enhance your skills while having fun!
      </motion.p>

      <motion.div
        className="relative w-full max-w-3xl h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Image
          src="/images/learning-game.jpg"
          alt="Learning English with fun games"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
          <p className="text-xl md:text-2xl font-semibold text-white drop-shadow">
            🎮 Play. Learn. Grow.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
