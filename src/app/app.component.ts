import {Component, OnInit} from '@angular/core';
import {IWeather} from "./models/weather";
import {weather as weatherData} from "./data/weather";
import {RouterOutlet} from "@angular/router";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'InfoScreen';
  weather: IWeather = weatherData
  backgroundImageUrl: string;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitle(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    this.setBackgroundImage();
  }

  setBackgroundImage() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (month === 12) { // December for Christmas
      this.backgroundImageUrl = '../assets/img/bg/bg_christmas.jpg';
    } else
      if (month === 5 && day <= 17 && day >= 10) { // May 17th
      this.backgroundImageUrl = '../assets/img/bg/bg_17mai.jpg';
    } else if (this.isEaster(today)) { // Easter
      this.backgroundImageUrl = '../assets/img/bg/bg_easter.jpg';
    } else { // Default
      this.backgroundImageUrl = '../assets/img/bg/bg_it.jpg';
    }
  }

  isEaster(date: Date): boolean {
    const easterDate = this.Easter(date.getFullYear());
    const [easterMonth, easterDay] = easterDate.split('.').map(Number);
    return date.getMonth() + 1 === easterMonth && date.getDate() === easterDay;
  }

  Easter(Y: number): string {
    var C = Math.floor(Y / 100);
    var N = Y - 19 * Math.floor(Y / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30 * Math.floor((I / 30));
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);

    return M + '.' + D;
  }

  updateTitle(url: string) {
    if (url.includes('nrk')) {
      this.title = 'NRK Nyheter';
    } else if (url.includes('vg')) {
      this.title = 'VG Nyheter';
    } else if (url.includes('kode24')) {
      this.title = 'Kode24 Nyheter';
    } else if (url.includes('devfunfact')) {
      this.title = '';
    } else if (url.includes('dalle')) {
      this.title = 'Dagens bilde fra AI';
    } else if (url.includes('funfact')) {
      this.title = 'Visste du at? (AI)';
    } else {
      this.title = '';
    }
  }
}
