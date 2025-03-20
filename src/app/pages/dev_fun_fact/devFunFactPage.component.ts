import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {EnvironmentService} from "../../services/environment.service";

@Component({
  selector: 'app-root',
  templateUrl: './devFunFactPage.component.html',
  styleUrls: ['./devFunFactPage.component.scss'],
})
export class DevFunFactPageComponent implements OnInit {
  textResonse: string = '';
  textQuestion: string = '';
  textAnswer: string = '';

  private chatGptUrl: string;
  private chatGptApiKey: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private envService: EnvironmentService
  ) {
    // Fetch environment values
    this.chatGptUrl = this.envService.getChatGptUrl();
    this.chatGptApiKey = this.envService.getChatGptApiKey();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const cacheFromUrl = params['cache'];

      const storedResponse = cacheFromUrl !== 'false' ? this.getStoredResponse() : null;
      if (storedResponse) {
        console.log("CACHE");
        this.setStoredData(storedResponse);
      } else {
        console.log("NEW DEV FUN FACT");
        this.getDevFunFact();
      }
    });
  }

  getDevFunFact(): void {
    const url = this.chatGptUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': this.chatGptApiKey
    });
    const body = {
      messages: [
        { role: 'system', content: 'You are an AI assistant that helps people find information.' },
        { role: 'user', content: 'lag et spøk for utvikleren  \n' +
            'der det er:  \n' +
            'Spørsmål:  \n' +
            'Svar:  \n' +
            'vis kun spørsmål og svar' }
      ],
      max_tokens: 800,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95,
      stop: null
    };

    this.http.post<any>(url, body, { headers }).subscribe(
      response => {
        if (response && response.choices && response.choices.length > 0) {
          this.textResonse = response.choices[0].message.content;
          console.log(this.textResonse);

          const questionMatch = this.textResonse.match(/Spørsmål:\s*(.*)/);
          const answerMatch = this.textResonse.match(/Svar:\s*(.*)/);

          if (questionMatch && questionMatch[1]) {
            this.textQuestion = questionMatch[1].trim();
          }

          if (answerMatch && answerMatch[1]) {
            this.textAnswer = answerMatch[1].trim();
          }

          this.storeResponse({
            textQuestion: this.textQuestion,
            textAnswer: this.textAnswer
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  storeResponse(data: { textQuestion: string, textAnswer: string }): void {
    const expiryTime = this.getNextExpiryTime();
    const item = {
      value: data,
      expiry: expiryTime
    };
    localStorage.setItem('devFunFactResponse', JSON.stringify(item));
  }

  getStoredResponse(): { textQuestion: string, textAnswer: string } | null {
    const itemStr = localStorage.getItem('devFunFactResponse');
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now >= item.expiry) {
      localStorage.removeItem('devFunFactResponse');
      return null;
    }

    return item.value;
  }

  setStoredData(data: { textQuestion: string, textAnswer: string }): void {
    this.textQuestion = data.textQuestion;
    this.textAnswer = data.textAnswer;
  }

  getNextExpiryTime(): number {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const nextExpiry = new Date();

    if (currentHour < 3 || (currentHour === 3 && currentMinutes < 30)) {
      nextExpiry.setHours(3, 0, 0, 0); // 3 AM today
    } else if (currentHour < 11 || (currentHour === 11 && currentMinutes < 30)) {
      nextExpiry.setHours(11, 30, 0, 0); // 11:30 AM today
    } else if (currentHour >= 11 && currentHour < 24) {
      nextExpiry.setHours(3, 0, 0, 0); // 3 AM tomorrow
      nextExpiry.setDate(nextExpiry.getDate() + 1);
    }

    return nextExpiry.getTime();
  }
}
