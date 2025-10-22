'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';

export default function AudioToggle() {
    const [on, setOn] = useState(true);

    return (
        <Button onClick={() => setOn(!on)} className="btn px-2 py-1 bg-gray-200 rounded">
            {on ? "🔊" : "🔇"}
        </Button>
    );
}
