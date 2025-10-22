import { GameResponseBase } from "./index";
export interface OppositeQuestItem {
  // empty item shape by request
}


export interface OppositeQuestResponse extends GameResponseBase<"oppositeQuest", OppositeQuestItem[]> {}
