import { GameResponseBase } from "./index";
export interface PhraseCrazeItem {
  // empty item shape by request
}


export interface PhraseCrazeResponse
  extends GameResponseBase<"phraseCraze", PhraseCrazeItem[]> {}
