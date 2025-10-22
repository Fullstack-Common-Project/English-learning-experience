import { GameResponseBase } from "./index";
export interface PicPickItem {
  // empty item shape by request; add fields as needed
}


export interface PicPickResponse
  extends GameResponseBase<"picpick", PicPickItem[]> {}
