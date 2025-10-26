"use client";
import DialogBase from "./DialogBase";

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function HelpDialog({ open, onClose }: HelpDialogProps) {
  if (!open) return null;

  return (
    <DialogBase title="Instructions" onClose={onClose}>
      <p className="leading-relaxed">
        🎮 !Welcome to the English learning gaming platform
        <br />
        .Choose a game and start playing experientially
        <br />
        🚀 !Good luck
      </p>
    </DialogBase>
  );
}
