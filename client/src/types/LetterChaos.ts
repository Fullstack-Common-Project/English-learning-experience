import { GameResponseBase } from "./index";
export interface LetterChaosItem {
  // empty item shape by request
}


export interface LetterChaosResponse
  extends GameResponseBase<"letterChaos", LetterChaosItem[]> {}
