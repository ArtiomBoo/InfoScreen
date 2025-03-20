import {Component} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {news} from "../../data/news";

@Component({
  selector: 'app-root',
  templateUrl: './kode24Page.component.html',
  styleUrls: ['./kode24Page.component.scss'],
})
export class Kode24PageComponent{

  news = news;

  constructor(private newsService:NewsService) {
  }
  ngOnInit(): void {
    this.newsService.getKode24Rss().subscribe(news => {
      this.news = news
    })
  }
}
