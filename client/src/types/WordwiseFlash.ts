import { GameResponseBase } from "./index";
export interface WordwiseFlashItem {
  // empty item shape by request
}


export interface WordwiseFlashResponse
  extends GameResponseBase<"wordwiseFlash", WordwiseFlashItem> {}
