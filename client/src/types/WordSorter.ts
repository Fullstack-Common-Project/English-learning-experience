// import { GameResponseBase } from "./index";

// export interface WordSorterItem {
//   wordText: string;
//   categories: string[];
//   correctIndex: number;
// }

// export interface WordSorterResponse
//   extends GameResponseBase<7, WordSorterItem> {}
export interface WordSorterItem {
  wordText: string;
  categories: string[];
  correctIndex: number;
}

export interface WordSorterResponse {
  data: {
    gameId: 7;
    data: WordSorterItem;
  };
  isSuccess: boolean;
  statusCode: number;
  message: string;
}
