import React from "react";

interface NextRoundButtonProps {
  showButton: boolean;
  onNextRound: () => void;
}

export default function NextRoundButton({
  showButton,
  onNextRound,
}: NextRoundButtonProps) {
  if (!showButton) return null;
  return <button onClick={onNextRound}>Next Round</button>;
}
