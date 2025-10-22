import { GameResponseBase } from "./index";
export interface GuessMasterItem {
  // empty item shape by request
}


export interface GuessMasterResponse
  extends GameResponseBase<"guessMaster20", GuessMasterItem[]> {}
