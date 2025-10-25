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
import { WordSorterResponse } from "./WordSorter";
import { LetterChaosResponse } from "./LetterChaos";
import { GuessMasterResponse } from "./GuessMaster";
import { DoubleVisionResponse } from "./DoubleVision";
import { ContextCluesResponse } from "./ContextClues";
import { PhraseCrazeResponse } from "./PhraseCraze";
import { PictureHangmanResponse } from "./PictureHangman";

export interface GameResponseMap {
  sentenceShuffle: SentenceShuffleResponse;
  17 : PicPickResponse;
  9: GrammarGuruResponse;
  1: OppositeQuestResponse;
  10: TwinWordsResponse;
  6 : MiniWordleResponse;
  8: MemorySynonymsResponse;
  11: MemoryAntonymsResponse;
  18: RhymeTimeResponse;
  wordwiseFlash: WordwiseFlashResponse;
  2: PictureHangmanResponse;
  7: WordSorterResponse;
  3: LetterChaosResponse;
  14: GuessMasterResponse;
  12 : DoubleVisionResponse;
  15: ContextCluesResponse;
  16: PhraseCrazeResponse;
}


export type GameId=keyof GameResponseMap
export type GameDataResponse = GameResponseMap[GameId];
export type GameResponseFor<T extends GameId> = GameResponseMap[T];
export interface GameResponseBase<T extends GameId, D> {
  gameId: T;
  data: D;
}

export type { LeaderboardResponse } from "./Leaderboard";
export type { SubmitProgressPayload, SubmitProgressResponse } from "./SubmitProgress";
