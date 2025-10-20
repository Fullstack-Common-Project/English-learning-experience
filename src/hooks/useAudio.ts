// // src/hooks/useAudio.ts
// import { useRef } from "react";

// export function useAudio(src: string) {
//   const audioRef = useRef(new Audio(src));

//   const play = () => {
//     audioRef.current.currentTime = 0;
//     audioRef.current.play().catch((err) => console.error("Audio error", err));
//   };

//   const stop = () => {
//     audioRef.current.pause();
//     audioRef.current.currentTime = 0;
//   };

//   return { play, stop };
// }

import { useRef, useEffect } from "react";

export default function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(src);
    }
  }, [src]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.error("Audio error:", err));
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop };
}

