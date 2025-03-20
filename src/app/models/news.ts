import {newsItems} from "./newsItems";

export interface INews {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: newsItems[]
}
