"use client";
import DialogBase from "./DialogBase";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <DialogBase title="Accepting Terms of Use" onClose={onClose}>
      <p className="text-gray-700 mb-4">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Yes ✅
        </button>
      </div>
    </DialogBase>
  );
}
