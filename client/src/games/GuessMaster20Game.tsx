import React from "react";
import GameLayout from "@/components/common/GameLayout";
import GuessMaster20Game from "@/games/GuessMaster20Game";

export const metadata = {
  title: "GuessMaster 20",
};

export default function GuessMaster20Page() {
  return (
    <GameLayout gameTitle="GuessMaster 20">
      <GuessMaster20Game />
    </GameLayout>
  );
}
