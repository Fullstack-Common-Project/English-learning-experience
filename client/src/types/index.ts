// 📥 Imports - הוסיפי את כל קבצי המשחקים שלך:
import { SentenceShuffleResponse } from "./SentenceShuffle";
import { PicPickResponse } from "./PicPick";
import { GrammarGuruResponse } from "./GrammarGuru";
import { OppositeQuestResponse } from "./OppositeQuest";
import { TwinWordsResponse } from "./TwinWords";
import { MiniWordleResponse } from "./MiniWordle";
import { MemorySynonymsResponse } from "./MemorySynonyms";
import { MemoryAntonymsResponse } from "./MemoryAntonyms";
import { RhymeTimeResponse } from "./RhymeTime";
import { WordwiseFlashResponse } from "./WordwiseFlash";
import { RevealItResponse } from "./RevealIt";
import { WordSorterResponse } from "./WordSorter";
import { LetterChaosResponse } from "./LetterChaos";
import { GuessMasterResponse } from "./GuessMaster";
import { DoubleVisionResponse } from "./DoubleVision";
import { ContextCluesResponse } from "./ContextClues";
import { PhraseCrazeResponse } from "./PhraseCraze";

export enum GameId {
  SentenceShuffle = 1,
  PicPick,
  GrammarGuru,
  OppositeQuest,
  TwinWords,
  MiniWordle,
  MemorySynonyms,
  MemoryAntonyms,
  RhymeTime,
  WordwiseFlash,
  RevealIt,
  WordSorter,
  LetterChaos,
  GuessMaster,
  DoubleVision,
  ContextClues,
  PhraseCraze,
}

export type GameResponseMap = Record<
  GameId,
  | SentenceShuffleResponse
  | PicPickResponse
  | GrammarGuruResponse
  | OppositeQuestResponse
  | TwinWordsResponse
  | MiniWordleResponse
  | MemorySynonymsResponse
  | MemoryAntonymsResponse
  | RhymeTimeResponse
  | WordwiseFlashResponse
  | RevealItResponse
  | WordSorterResponse
  | LetterChaosResponse
  | GuessMasterResponse
  | DoubleVisionResponse
  | ContextCluesResponse
  | PhraseCrazeResponse
>;

export type GameDataResponse = GameResponseMap[GameId];
export type GameResponseFor<T extends GameId> = GameResponseMap[T];
export interface GameResponseBase<T extends GameId, D> {
  gameId: T;
  data: D;
}

export type { LeaderboardResponse } from "./Leaderboard";
export type { SubmitProgressPayload, SubmitProgressResponse } from "./SubmitProgress";
