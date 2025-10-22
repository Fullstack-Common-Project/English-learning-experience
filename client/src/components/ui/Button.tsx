// // components/GameButton.tsx
// import React from "react";

// interface GameButtonProps {
//   keyProp: string | number;
//   onClick: () => void;
//   disabled?: boolean;
//   opt: string;
// }

// const GameButton: React.FC<GameButtonProps> = ({
//   keyProp,
//   onClick,
//   disabled = false,
//   opt,
// }) => {
//   return (
//     <button
//       key={keyProp}
//       onClick={onClick}
//       disabled={disabled}
//       className="btn-primary px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200"
//     >
//       {opt}
//     </button>
//   );
// };

// export default GameButton;
