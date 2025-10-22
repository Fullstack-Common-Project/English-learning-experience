import { GameResponseBase } from "./index";
export interface MemorySynonymsItem {
  // empty item shape by request
}


export interface MemorySynonymsResponse
  extends GameResponseBase<"memorySynonyms", MemorySynonymsItem[]> {}
