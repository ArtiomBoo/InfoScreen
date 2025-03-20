import {newsItems} from "./newsItems";

export interface IDalleImage {
  created: string
  data: [
    {
      revised_prompt: string,
      url: string
    }
  ]
}
