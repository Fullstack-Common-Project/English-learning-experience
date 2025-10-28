"use client";
import React from "react";

interface Props {
  mistakesCount: number;
  totalMistakes: number;
  wrongLetters: string[]; // letters guessed incorrectly so far
}

export default function MistakesList({ mistakesCount, totalMistakes, wrongLetters }: Props) {
  return (
    <div className="p-3 rounded-lg shadow-md bg-slate-900 text-white">
      <h3 className="text-lg font-bold mb-2">Mistakes</h3>
      <div className="mb-2">
        <div>Total mistakes: <span className="font-bold">{mistakesCount}</span> / {totalMistakes}</div>
      </div>

      <div className="mb-2">
        <div className="text-sm text-slate-300">Wrong letters:</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {wrongLetters.length === 0 ? (
            <div className="text-slate-400 text-sm">None yet</div>
          ) : (
            wrongLetters.map((l) => (
              <div key={l} className="px-2 py-1 rounded-md bg-red-600 text-white font-bold">
                {l}
              </div>
            ))
          )}
        </div>
      </div>

      {/* <div className="mt-3 text-xs text-slate-400">
        Note: Each mistake reveals parts of the image. On the last mistake, the remaining parts are revealed as well.
      </div> */}
    </div>
  );
}
