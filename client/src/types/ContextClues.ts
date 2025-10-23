import { GameResponseBase } from "./index";
export interface ContextCluesItem {
  // empty item shape by request
}


export interface ContextCluesResponse
  extends GameResponseBase<15, ContextCluesItem> {}
