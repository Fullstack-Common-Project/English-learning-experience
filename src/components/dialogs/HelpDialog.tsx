// "use client";
// import React from "react";

// interface HelpDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// export default function HelpDialog({ open, onClose }: HelpDialogProps) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
//         <h2 className="mb-3 text-xl font-semibold">עזרה</h2>
//         <p className="mb-4 text-gray-700">
//           כאן יוצג הסבר על איך לשחק במשחק / להשתמש באפליקציה.
//         </p>
//         <button
//           onClick={onClose}
//           className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//         >
//           סגור
//         </button>
//       </div>
//     </div>
//   );
// }



// src/components/dialogs/HelpDialog.tsx
import React from "react";

interface HelpDialogProps {
  onClose: () => void;
}

export default function HelpDialog({ onClose }: HelpDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[420px] p-8 text-center relative animate-fadeIn">
        <h2 className="mb-4 text-2xl font-bold text-blue-700">📘 Help</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          Welcome to <b>Educational Games!</b>
          <br />
          Learn English through fun and interactive challenges.
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2 font-semibold text-white transition-transform bg-blue-600 rounded-lg shadow hover:bg-blue-700 hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
}
