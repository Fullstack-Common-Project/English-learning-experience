"use client";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import { useLeaderboardStore } from "@/store/UseLeaderboardStore";
import { LeaderboardEntry } from "@/types/Leaderboard";

type AboutSectionProps = {
    gameId: number; 
    leaderboard?: LeaderboardEntry[]; 
};

export default function AboutSection({ gameId }: AboutSectionProps) {
    const users = useLeaderboardStore((state) => state.leaderboard);
    return <Leaderboard users={users} />;
}
