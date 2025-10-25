"use client";
import GameLayout from "@/components/common/GameLayout";
import GuessMaster20Game from "@/games/GuessMaster20Game";


export default function Page() {
return (
<GameLayout gameTitle="🧠 GuessMaster 20 – ניחוש ב-20 שאלות">
<GuessMaster20Game />
</GameLayout>
);
}