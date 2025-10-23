import { GameResponseBase } from "./index";
export interface TwinWordsItem {
  // empty item shape by request
}


export interface TwinWordsResponse extends GameResponseBase<10, TwinWordsItem> {}
