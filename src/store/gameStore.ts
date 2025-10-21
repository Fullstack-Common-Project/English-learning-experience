import { create } from "zustand";

interface GameState {
  playerName: string;
  score: number;
  time: number;
  setPlayerName: (name: string) => void;
  setScore: (score: number) => void;
  setTime: (time: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerName: "",
  score: 0,
  time: 0,
  setPlayerName: (name) => set({ playerName: name }),
  setScore: (score) => set({ score }),
  setTime: (time) => set({ time }),
  resetGame: () => set({ playerName: "", score: 0, time: 0 }),
}));
