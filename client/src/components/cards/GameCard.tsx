"use client";
import React from "react";

type GameCardProps = {
  title: string;
  image?: string; // הופך לאופציונלי
  description: string;
  onPlay: () => void;
};

export function GameCard({ title, image, description, onPlay }: GameCardProps) {
  const defaultImage = "/img/default-game.jpg"; // תמונת ברירת מחדל במקרה שאין תמונה

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
      <img
        src={image || defaultImage} // אם אין תמונה, מציגים את ברירת המחדל
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm flex-1">{description}</p>
        <button
          onClick={onPlay}
          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          🎮 שחק עכשיו
        </button>
      </div>
    </div>
  );
}
