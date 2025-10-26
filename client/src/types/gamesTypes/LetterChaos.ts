import { GameResponseBase } from "./index";

export interface LetterChaosItem {
  id: number; 
  data:{
   words:LetterChaosItemSingle[]
  }
};

export interface LetterChaosItemSingle {
  id: number;
  scrambled: string;
  correctWord: string;
}

export interface LetterChaosResponse extends GameResponseBase<3, LetterChaosItem> {}