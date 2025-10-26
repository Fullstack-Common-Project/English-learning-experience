"use client";
import React from "react";
import Link from "next/link";
type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export default function Logo({ size = "md", className = "" }: Props) {
  const textSize = sizes[size];

  return (
    <Link
    href={"/"}
    ><div
      className={`inline-flex flex-col items-center text-center select-none ${className}`}
      aria-label="Game English logo"
    >
      <div
        className={`nav-brand font-extrabold tracking-tight text-indigo-300 ${textSize}`}
      >
        <span className="block">Game</span>
        <span className="block text-slate-100">English</span>
      </div>
      <div className="text-xs text-slate-400 -mt-0.5">Play • Learn • Grow</div>
    </div>
    </Link>
    
  );
}
