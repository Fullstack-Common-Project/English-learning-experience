import { GameResponseBase } from "../index";
export interface WordSorterItem {
  // empty item shape by request
}


export interface WordSorterResponse
  extends GameResponseBase<7, WordSorterItem> {}
