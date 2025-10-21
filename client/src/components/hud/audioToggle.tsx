'use client';
import React, { useState } from 'react';

export default function AudioToggle() {
    const [on, setOn] = useState(true);

    return (
        <button onClick={() => setOn(!on)} className="px-2 py-1 bg-gray-200 rounded">
            {on ? "🔊" : "🔇"}
        </button>
    );
}
