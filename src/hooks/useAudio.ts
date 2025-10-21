"use client";
import { useRef } from "react";

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current && typeof Audio !== "undefined") {
    audioRef.current = new Audio(src);
  }

  const play = () => audioRef.current?.play().catch(() => {});
  const pause = () => audioRef.current?.pause();

  return { play, pause };
}
