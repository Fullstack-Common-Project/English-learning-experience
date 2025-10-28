// "use client";
// import React from "react";
// import { GameCard } from "./GameCard";
// import axios from "axios";


// type Game = {
//   gameId: number;
//   gameName: string;
//   description: string;
// };

// export default function GameSelect() {

//   useEffect(() => {},[])


//   try{
//     const response = await axios.get("https://localhost:7292/api/v1/Game/GetAllAsync");
//     const data = response.data;
     
//   }
//   catch(error){
//     console.log("ERROR ," + error);
//   }

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
//         🎮 בחרי משחק לתרגול אנגלית
//       </h1>

//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {games.map((g) => (
//           <GameCard
//             key={g.title}
//             title={g.title}
//             image={g.image}
//             description={g.description}
//             onPlay={() => alert(`נכנסת ל-${g.title}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GameCard } from "./GameCard";

type Game = {
  gameId: number;
  gameName: string;
  description: string;
  image?: string; // אופציונלי - אם השרת מחזיר נתיב תמונה
};

export default function GameSelect() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("https://localhost:7292/api/v1/Game/GetAllAsync");
        if (response.data.isSuccess) {
          setGames(response.data.data);
        } else {
          setError("שגיאה בטעינת המשחקים");
        }
      } catch (err: any) {
        console.error(err);
        setError("שגיאה בשרת");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div className="text-center py-10">טוען משחקים...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        🎮 בחרי משחק לתרגול אנגלית
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {games.map((g) => (
          <GameCard
            key={g.gameId}
            title={g.gameName}
            image={g.image || `/img/${g.gameName.toLowerCase().replace(/\s+/g, "-")}.jpg`} 
            description={g.description}
            onPlay={() => alert(`נכנסת ל-${g.gameName}`)}
          />
        ))}
      </div>
    </div>
  );
}
