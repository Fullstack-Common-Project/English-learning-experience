import { GameResponseBase } from "./index";

export interface DoubleVisionOption {
  imageUrl: string;
  label: string;
}

export interface DoubleVisionItem {
  mainWord: string;
  options: DoubleVisionOption[];
  correctIndex: number;
}


export interface DoubleVisionResponse
  extends GameResponseBase<12, { items: DoubleVisionItem[] }> { }
