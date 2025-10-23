import { GameResponseBase } from "./index";

export interface MiniWordleItem {
  data: {
    targetWord: string;
    wordLength: number;
    id: number | null;}
}


export interface MiniWordleResponse extends GameResponseBase<6, MiniWordleItem> {}
