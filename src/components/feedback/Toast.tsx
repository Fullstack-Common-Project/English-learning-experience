// // src/components/feedback/Toast.tsx
// import React, { useEffect, useState } from "react";

// interface ToastProps {
//   message: string;
//   duration?: number;
// }

// export const Toast: React.FC<ToastProps> = ({ message, duration = 2000 }) => {
//   const [visible, setVisible] = useState(true);
//   useEffect(() => {
//     const timer = setTimeout(() => setVisible(false), duration);
//     return () => clearTimeout(timer);
//   }, [duration]);

//   if (!visible) return null;

//   return (
//     <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
//       {message}
//     </div>
//   );
// };

import React, { useEffect } from "react";

export interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow-md animate-fadeIn">
      {message}
    </div>
  );
};

export default Toast;
