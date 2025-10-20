// src/components/dialogs/ResultsDialog.tsx
// import React from "react";

// interface ResultsDialogProps {
//   score: number;
//   onClose: () => void;
// }

// export const ResultsDialog: React.FC<ResultsDialogProps> = ({ score, onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//     <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
//       <h2 className="text-xl font-bold mb-3">תוצאות המשחק</h2>
//       <p>הניקוד שלך: <strong>{score}</strong></p>
//       <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={onClose}>
//         סגור
//       </button>
//     </div>
//   </div>
// );



import React from "react";

export interface ResultsDialogProps {
  score: number;
  onClose: () => void;
}

const ResultsDialog: React.FC<ResultsDialogProps> = ({ score, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      {/* <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Results 🏆</h2>
        <p className="text-lg mb-4">Your score: {score}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div> */}

      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-[90%] sm:w-96 text-center border border-gray-100">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">🏆 Results</h2>
        <p className="text-gray-700 mb-6 text-lg">
          Your score: <span className="font-bold text-purple-800">{score}</span>
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow hover:bg-purple-600 hover:scale-105 transition-transform"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultsDialog;
