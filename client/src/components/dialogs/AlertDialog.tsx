"use client";
import { motion } from "framer-motion";
import DialogBase from "./DialogBase";

interface AlertDialogProps {
  title: string;
  message: string;
  onClose: () => void;
}

export default function AlertDialog({
  title,
  message,
  onClose,
}: AlertDialogProps) {

  return (
    <DialogBase title={title} onClose={onClose}>
      <p className="text-gray-600 mb-6">{message}</p>
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
      >
        OK
      </motion.button>
    </DialogBase>
  );
}
