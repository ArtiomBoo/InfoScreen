import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'News';
  time: string = '';
  date: string = '';
  weather: string = 'Laster vær...'; // "Loading weather..." in Norwegian

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Updates every second
    this.getWeather();
  }

  updateTime() {
    const now = new Date();

    // 🕒 Set 24-hour time format
    this.time = now.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // 📅 Set date format in Norwegian
    this.date = now.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' });

    // Capitalize first letter of weekday
    this.date = this.date.charAt(0).toUpperCase() + this.date.slice(1);
  }

  getWeather() {
    this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=59.91&longitude=10.75&current_weather=true`)
      .subscribe((data: any) => {
        this.weather = `Oslo: ${data.current_weather.temperature}°C`;
      });
  }
}
