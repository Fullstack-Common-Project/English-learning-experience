export interface GameData {
  word: string;
  options: string[];
  correctIndices: number[];
}

export interface GameProgress {
  playerName: string;
  score: number;
  time: number;
  gameId: string;
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  time: number;
}
