import { GameResponseBase } from "./index";
export interface RevealItItem {
  // empty item shape by request
}


export interface RevealItResponse
  extends GameResponseBase<"revealIt", RevealItItem[]> {}
