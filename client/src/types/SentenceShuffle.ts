export interface SentenceShuffleItem {
   data: {
  id: number | string;
  words: string[];
  correctSentence: string;}
}

export interface SentenceShuffleResponse {
  GameName: "SentenceShuffle"; 
  data: SentenceShuffleItem;
}
