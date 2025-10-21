import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    gameId: "rhyme-time",
    data: [
      {
        id: 1,
        word: "cat",
        options: ["hat", "hot", "cut", "bat"],
        correctIndices: [0, 3],
      },
    ],
  });
}
