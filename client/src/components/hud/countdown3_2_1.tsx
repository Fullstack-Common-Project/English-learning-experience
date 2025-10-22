import { useState, useEffect } from "react";

interface CountdownProps {
  onFinish: () => void;
}

export default function Countdown3_2_1({ onFinish }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onFinish();
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="countdown-overlay">
      {count > 0 ? count : null}
    </div>
  );
}
