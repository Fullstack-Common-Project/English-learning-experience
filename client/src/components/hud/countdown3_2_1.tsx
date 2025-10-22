import { useState, useEffect } from "react";

export default function Countdown3_2_1({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onFinish();
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white bg-black/50">
      {count > 0 ? count : null}
    </div>
  )
}
