import { useState, useEffect } from "react";

export type WordSorterRound = {
  word: string;
  categories: string[];
  correctIndex: number;
};

export function useWordSorterRounds(gameId: number) {
  const [rounds, setRounds] = useState<WordSorterRound[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRounds() {
      try {
        const res = await fetch(`https://localhost:7292/api/v1/GeneralGame/${gameId}/data`);
        const json = await res.json();

        const round: WordSorterRound = {
          word: json.data.data.wordText,
          categories: json.data.data.categories,
          correctIndex: json.data.data.correctIndex,
        };

        setRounds([round]); // אם ה-API מחזיר כמה סיבובים אפשר להתאים
      } catch (err) {
        console.error("Error fetching rounds:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRounds();
  }, [gameId]);

  return { rounds, loading };
}
