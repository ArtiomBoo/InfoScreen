import {Component} from '@angular/core';
import {EnvironmentService} from "../../services/environment.service";

@Component({
  selector: 'app-root',
  templateUrl: './mainPage.component.html',
  styleUrls: ['./mainPage.component.scss'],
})
export class MainPageComponent{
  lunch = false;
  date = new Date();
  title : string;
  constructor(private envService: EnvironmentService) {
    this.title = this.envService.getTitle();
  }

  ngOnInit(): void {
    if(this.date.getHours() === 11){
      this.lunch = true;
    }
  }

}
