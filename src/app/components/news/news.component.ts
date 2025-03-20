import {Component, Input} from "@angular/core";
import {INews} from "../../models/news";
import {newsItems} from "../../models/newsItems";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export  class NewsComponent {
  @Input() news: INews
  @Input() newsItems: newsItems

  getTruncatedDescription(): string {
    const maxLength = 150;
    if (this.newsItems.description.length > maxLength) {
      return this.newsItems.description.substr(0, maxLength) + '...';
    } else {
      return this.newsItems.description;
    }
  }
}
