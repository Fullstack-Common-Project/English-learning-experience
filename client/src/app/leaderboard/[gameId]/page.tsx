"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import { useParams } from "next/navigation";
import { GameResponseMap } from "@/types";
import { GameId } from "@/types";

export default function AboutSection() {
    const params = useParams();


    const gameIdParam = Array.isArray(params.gameId) ? params.gameId[0] : params.gameId;

    if (!gameIdParam) return <p>Game ID not found</p>;


    if (!(gameIdParam as keyof GameId)) {
        return <p>Invalid Game ID</p>;
    }

    const gameId = gameIdParam as keyof GameResponseMap;

    const { data: leaderboardData, isLoading } = useLeaderboard(gameId);

    if (isLoading || !leaderboardData) return <p>Loading...</p>;

    return (
        <div className="mt-4 mb-4">
            <Leaderboard users={leaderboardData.data?.leaderboards || []} />
        </div>
    );


}
