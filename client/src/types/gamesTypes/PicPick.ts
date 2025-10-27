import { GameResponseBase } from "./index";

export interface PicPickItem {
  id: number;            
  imageUrl: string;       
  sentences: string[];   
  correctIndex: number;   
}

export interface PicPickResponse
  extends GameResponseBase<17, { items: PicPickItem[] }> {}