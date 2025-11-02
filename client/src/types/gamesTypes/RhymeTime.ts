// import { GameResponseBase } from "./index";
// export interface RhymeTimeItem {
//   // empty item shape by request
// }


// export interface RhymeTimeResponse
//   extends GameResponseBase<18, RhymeTimeItem> {}





  import { GameResponseBase } from "../index";

// 🧩 טיפוס הנתונים הספציפי של המשחק שלך (מה שהשרת מחזיר)
export interface RhymeTimeItem {
  word: string;
  options: string[];
  correctIndices: number[];
}

// 🧩 תגובת המשחק מהשרת
export interface RhymeTimeResponse
  extends GameResponseBase<18, RhymeTimeItem> {}



// import { GameResponseBase } from "../index";
// export interface RhymeTimeItem {
//   // empty item shape by request
// }


// export interface RhymeTimeResponse
//   extends GameResponseBase<18, RhymeTimeItem> {}
