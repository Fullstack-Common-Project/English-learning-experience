import { GameResponseBase } from "./index";

export interface MemoryAntonymsItem {
  // empty item shape by request
}

export interface MemoryAntonymsResponse
  extends GameResponseBase<11, MemoryAntonymsItem> {}
