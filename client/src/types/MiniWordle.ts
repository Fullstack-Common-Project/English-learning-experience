import { GameResponseBase } from "./index";
export interface MiniWordleItem {
  // empty item shape by request
}


export interface MiniWordleResponse extends GameResponseBase<"miniWordle", MiniWordleItem[]> {}
