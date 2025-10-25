import { GameResponseBase } from "../index";
export interface OppositeQuestItem {
  id: any;
  data:{
   items:OppositeQuestItemSingle[]
  }
};

export interface OppositeQuestItemSingle { 
  id: number;
  word: string;
  options: string[];
  correctIndex: number;
}
export interface OppositeQuestResponse extends GameResponseBase<1, OppositeQuestItem> {}