'use client';
import React from 'react';

interface PauseOverlayProps {
  message?: string; // אפשרות להציג הודעה מותאמת
}

export default function PauseOverlay({ message }: PauseOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center shadow-lg">
        {/* סמל עצירה */}
        <div className="text-6xl font-bold text-red-600 mb-4">⏸</div>
        {/* הודעה מותאמת */}
        <p className="text-xl font-semibold text-gray-800">{message || 'המשחק בהפסקה'}</p>
      </div>
    </div>
  );
}
