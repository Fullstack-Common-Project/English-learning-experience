import { GameResponseBase } from "./index";

export interface PairDTO {
  wordA: string;
  wordB: string;
}




export interface MemoryAntonymsResponse
  extends GameResponseBase<11, PairDTO[]> {}
