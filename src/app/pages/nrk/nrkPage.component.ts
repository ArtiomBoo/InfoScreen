import {Component} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {news} from "../../data/news";

@Component({
  selector: 'app-root',
  templateUrl: './nrkPage.component.html',
  styleUrls: ['./nrkPage.component.scss'],
})
export class NrkPageComponent{

  news = news;

  constructor(private nrkService:NewsService) {
  }
  ngOnInit(): void {
    this.nrkService.getNrkRss().subscribe(news => {
      this.news = news
    })
  }
}
