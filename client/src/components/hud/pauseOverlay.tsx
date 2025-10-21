'use client';
import React from 'react';

interface PauseOverlayProps {
  message?: string;
}

export default function PauseOverlay({ message }: PauseOverlayProps) {
  return (
    <div className="pause-overlay">
      <div className="pause-overlay__content">
        <div className="pause-overlay__icon">⏸</div>
        <p className="pause-overlay__message">{message || 'המשחק בהפסקה'}</p>
      </div>
    </div>
  );
}
