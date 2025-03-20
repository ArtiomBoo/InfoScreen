import {Component} from '@angular/core';
import {NewsService} from "../../services/news.service";
import {news} from "../../data/news";

@Component({
  selector: 'app-root',
  templateUrl: './vgPage.component.html',
  styleUrls: ['./vgPage.component.scss'],
})
export class VgPageComponent{

  news = news;

  constructor(private vgService:NewsService) {
  }
  ngOnInit(): void {
    this.vgService.getVgRss().subscribe(news => {
      this.news = news
    })
  }
}
