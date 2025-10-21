"use client";
import DialogBase from "./DialogBase";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const [volume, setVolume] = useLocalStorage("volume", 0.5);

  if (!open) return null;

  return (
    <DialogBase title="Game settings" onClose={onClose}>
      <label className="flex flex-col gap-2">
        <span className="font-medium text-gray-800">🎧 Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full accent-indigo-600"
        />
      </label>
    </DialogBase>
  );
}
