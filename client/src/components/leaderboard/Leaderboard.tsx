'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  userName: string;
  score: number;
  time: number;
}

interface LeaderboardProps {
  users: LeaderboardEntry[]; 
  title?: string; 
}

export default function Leaderboard({ users, title = '🏆 Leaderboard' }: LeaderboardProps) {
  return (
    <div className="panel max-w-md mx-auto p-4 bg-slate-800/40 rounded-2xl shadow-md">
      <h2 className="section-title text-indigo-400 text-xl font-bold mb-3 text-center">
        {title}
      </h2>

      <ul className="divide-y divide-white/10">
        {users.map((entry, idx) => (
          <motion.li
            key={idx}
            className="flex justify-between p-3 hover:bg-slate-700/30 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-semibold text-slate-100 w-6 text-center">
              {entry.rank ?? idx + 1}.
            </span>
            <span className="text-slate-200 flex-1 text-center">
              {entry.userName}
            </span>
            <span className="font-mono text-indigo-400 w-12 text-right">
              {entry.score}
            </span>
            <span className="text-gray-400 text-sm w-10 text-right">
              {entry.time}s
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
