'use client';
import React, { useState } from 'react';

export default function AudioToggle() {
  const [on, setOn] = useState(true);

  return (
    <button
      onClick={() => setOn(!on)}
      className="audio-toggle"
      aria-label={on ? "Sound On" : "Sound Off"}
    >
      {on ? "🔊" : "🔇"}
    </button>
  );
}
