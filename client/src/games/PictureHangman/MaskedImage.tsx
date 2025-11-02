"use client"
import { motion } from "framer-motion";

interface MaskedImageProps {
    imageUrl: string;
    totalPieces: number;
    revealedPieces: number[];
}

export default function MaskedImage({ imageUrl, totalPieces, revealedPieces }: MaskedImageProps) {
    const rows = 10;
    const cols = 10;

    const pieces = Array.from({ length: totalPieces }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const isHidden = !revealedPieces.includes(i);

        return (
            <motion.div
                key={i}
                initial={{ opacity: 1 }}
                animate={{ opacity: isHidden ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: "absolute",
                    top: `${(r / rows) * 100}%`,
                    left: `${(c / cols) * 100}%`,
                    width: `${100 / cols}%`,
                    height: `${100 / rows}%`,
                    backgroundColor: "black",
                    border: "0.5px solid rgba(255,255,255,0.1)", // ✅ קווי רשת עדינים
                    boxSizing: "border-box",
                }}
            />
        );
    });

    return (
        <div
          style={{
            position: "relative",
            width: "min(30vw, 150px)", // ✅ גודל יחסי ולא קבוע
            aspectRatio: "1 / 1", // ✅ יחס קבוע כדי לא לעוות
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: "8px",
            boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          }}
        >
          {/* ✅ תמונה מלאה שלא תברח */}
          <img
            src={imageUrl}
            alt="word"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // עדיף על contain כאן
              display: "block",
            }}
          />
          {pieces}
        </div>
      );
}