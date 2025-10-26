// store/useLeaderboardStore.ts
import { create } from "zustand";
import { GameId } from "@/types"; // סוג GameId קיים
import { LeaderboardEntry } from "@/types/Leaderboard";

type LeaderboardState = {
    gameId: GameId | null; // מזהה המשחק הנוכחי
    leaderboard: LeaderboardEntry[];
    setLeaderboard: (gameId: GameId, data: LeaderboardEntry[]) => void;
    clearLeaderboard: () => void;
};

export const useLeaderboardStore = create<LeaderboardState>((set) => ({
    gameId: null,
    leaderboard: [],
    setLeaderboard: (gameId, data) => set({ gameId, leaderboard: data }),
    clearLeaderboard: () => set({ gameId: null, leaderboard: [] }),
}));
