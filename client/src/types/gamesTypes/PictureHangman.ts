import { GameResponseBase } from "./index";
export interface PictureHangmanItem {
  // empty item shape by request
}


export interface PictureHangmanResponse
  extends GameResponseBase<2, PictureHangmanItem> {}
