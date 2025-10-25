import { GameResponseBase } from "./index";
export interface GrammarGuruData {
  id: number;
  sentences: string[];
  correctIndex: number;
}
export interface GrammarGuruItem {
 data:{ data:GrammarGuruData[]};
}

export interface GrammarGuruResponse
  extends GameResponseBase<9, GrammarGuruItem> {}
