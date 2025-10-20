// "use client";
// import * as Dialog from "@radix-ui/react-dialog";
// import { motion } from "framer-motion";
// import { X } from "lucide-react";

// export default function ConfirmDialog({
//   open,
//   onClose,
//   title,
//   message,
//   onConfirm,
// }: {
//   open: boolean;
//   onClose: () => void;
//   title: string;
//   message: string;
//   onConfirm: () => void;
// }) {
//   return (
//     <Dialog.Root open={open} onOpenChange={onClose}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
//         <Dialog.Content asChild>
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="fixed top-1/2 left-1/2 w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">{title}</h2>
//               <button onClick={onClose}>
//                 <X size={20} className="text-gray-500 hover:text-gray-800" />
//               </button>
//             </div>
//             <p className="text-gray-700 dark:text-gray-200 mb-5">{message}</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300"
//               >
//                 ביטול
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 אישור
//               </button>
//             </div>
//           </motion.div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }




// src/components/dialogs/ConfirmDialog.tsx
import React from "react";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => (
  <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-[90%] sm:w-96 text-center border border-gray-100">
    <h2 className="text-xl font-bold text-red-600 mb-4">❗ Confirmation</h2>
    <p className="text-gray-700 mb-6">{message}</p>
    <div className="flex justify-center gap-3">
      <button
        onClick={onConfirm}
        className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-green-600 transition-transform"
      >
        Yes
      </button>
      <button
        onClick={onCancel}
        className="px-5 py-2 bg-gray-400 text-white rounded-lg font-semibold shadow hover:scale-105 hover:bg-gray-500 transition-transform"
      >
        No
      </button>
    </div>
  </div>

);
