"use client";
import React from "react";

type Player = {
  rank: number;
  name: string;
  score: number;
};

type LeaderboardTableProps = {
  players: Player[];
};

export function LeaderboardTable({ players }: LeaderboardTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-2xl p-4">
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-3 text-sm font-semibold text-gray-700">#</th>
            <th className="p-3 text-sm font-semibold text-gray-700">שם</th>
            <th className="p-3 text-sm font-semibold text-gray-700">נקודות</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.rank} className="border-b">
              <td className="p-3">{player.rank}</td>
              <td className="p-3">{player.name}</td>
              <td className="p-3">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
