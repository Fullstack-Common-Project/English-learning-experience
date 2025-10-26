import { GameResponseBase } from "..";

export interface MemorySynonymsItem {
  // empty item shape by request
}


export interface MemorySynonymsResponse
  extends GameResponseBase<8, MemorySynonymsItem> {}
