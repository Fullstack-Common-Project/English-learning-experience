import { GameResponseBase } from "..";

export interface ImageWordPair {
  targetWord: string;
  imageUrl: string
}
export interface PictureHangmanItem {
  data: {
    pairs: ImageWordPair[];
  };
}


export interface PictureHangmanResponse
  extends GameResponseBase<2, PictureHangmanItem> {}
