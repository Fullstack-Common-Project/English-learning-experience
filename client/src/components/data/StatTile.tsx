
"use client";
import React from "react";

type StatTileProps = {
  label: string;
  value: number | string;
};

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-2xl font-bold text-blue-700">{value}</span>
    </div>
  );
}
