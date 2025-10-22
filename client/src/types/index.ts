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

export interface GameResponseMap {
  sentenceShuffle: SentenceShuffleResponse;
  picpick: PicPickResponse;
  grammarGuru: GrammarGuruResponse;
  oppositeQuest: OppositeQuestResponse;
  twinwords: TwinWordsResponse;
  miniWordle: MiniWordleResponse;
  memorySynonyms: MemorySynonymsResponse;
  memoryAntonyms: MemoryAntonymsResponse;
  rhymeTime: RhymeTimeResponse;
  wordwiseFlash: WordwiseFlashResponse;
  revealIt: RevealItResponse;
  wordSorter: WordSorterResponse;
  letterChaos: LetterChaosResponse;
  guessMaster20: GuessMasterResponse;
  doubleVision: DoubleVisionResponse;
  contextClues: ContextCluesResponse;
  phraseCraze: PhraseCrazeResponse;
}

export type GameId = keyof GameResponseMap;
export type GameDataResponse = GameResponseMap[GameId];
export type GameResponseFor<T extends GameId> = GameResponseMap[T];
export interface GameResponseBase<T extends GameId, D> {
  gameId: T;
  data: D;
}

export type { LeaderboardResponse } from "./Leaderboard";
export type { SubmitProgressPayload, SubmitProgressResponse } from "./SubmitProgress";
