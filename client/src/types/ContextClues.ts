import { GameResponseBase } from "./index";
export interface ContextCluesItem {
  data: {
  id: number;
  sentence: string;
  options: string[];
  correctIndex: number;
  }
}

export interface ContextCluesResponse
  extends GameResponseBase<15, ContextCluesItem> {}
