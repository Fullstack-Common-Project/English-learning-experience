import { GameResponseBase } from "./index";
export interface GrammarGuruItem {
  // empty item shape by request; populate later
}


export interface GrammarGuruResponse
  extends GameResponseBase<"grammarGuru", GrammarGuruItem[]> {}
