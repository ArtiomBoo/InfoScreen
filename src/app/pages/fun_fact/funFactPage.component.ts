import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDalleImage } from '../../models/dalleImage';
import {EnvironmentService} from "../../services/environment.service";

@Component({
  selector: 'app-root',
  templateUrl: './funFactPage.component.html',
  styleUrls: ['./funFactPage.component.scss'],
})
export class FunFactPageComponent implements OnInit {
  text: string = '';
  fact: string = '';
  keyword: string = '';
  img: string = '';
  imageUrl: string = '';
  revisedPrompt: string = '';

  private dalleUrl: string;
  private chatGptUrl: string;
  private dalleApiKey: string;
  private chatGptApiKey: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private envService: EnvironmentService  // Inject EnvironmentService
  ) {
    // Fetch environment values
    this.dalleUrl = this.envService.getDalleUrl();
    this.chatGptUrl = this.envService.getChatGptUrl();
    this.dalleApiKey = this.envService.getDalleApiKey();
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
    const url = this.chatGptUrl;  // Use dynamic URL
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': this.chatGptApiKey
    });
    const body = {
      messages: [
        { role: 'system', content: 'You are an AI assistant that helps people find information.' },
        { role: 'user', content: 'fortell meg et morsomt fakt (ikke om Flamingoer) i den format:  \n' +
            'fakt:  \n' +
            'hovedord:  \n' +
            'hovedord skal være et ord på engelsk' }
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
          this.text = response.choices[0].message.content;

          console.log("text: " + this.text);

          const factMatch = this.text.match(/Fakt:\s*(.*)/);
          const keywordMatch = this.text.match(/Hovedord:\s*(.*)/);

          this.fact = factMatch ? factMatch[1].trim() : '';
          this.keyword = keywordMatch ? keywordMatch[1].trim() : '';

          console.log("fact: " + this.fact);
          console.log("keyword: " + this.keyword);

          this.generateImage(this.keyword).subscribe({
            next: (response) => this.handleResponse(response),
            error: (error) => console.error('Error:', error)
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  generateImage(prompt: string): Observable<IDalleImage> {
    const url = this.dalleUrl;  // Use dynamic URL

    const headers = new HttpHeaders({
      'api-key': this.dalleApiKey  // Use dynamic API key
    });

    const body = {
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    };

    return this.http.post<IDalleImage>(url, body, { headers: headers });
  }

  handleResponse(response: IDalleImage): void {
    if (response.data && response.data.length > 0) {
      this.setImageData(response);
      this.storeResponse({
        fact: this.fact,
        img: response.data[0].url,
        revisedPrompt: response.data[0].revised_prompt
      });
    }
  }

  setImageData(response: IDalleImage): void {
    this.imageUrl = response.data[0].url;
    this.revisedPrompt = response.data[0].revised_prompt;
  }

  storeResponse(data: { fact: string, img: string, revisedPrompt: string }): void {
    const expiryTime = this.getExpiryTimeFor1AMAnd1130AM();
    const item = {
      value: data,
      expiry: expiryTime
    };
    localStorage.setItem('funFactResponse', JSON.stringify(item));
  }

  getStoredResponse(): { fact: string, img: string, revisedPrompt: string } | null {
    const itemStr = localStorage.getItem('funFactResponse');
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now >= item.expiry) {
      localStorage.removeItem('funFactResponse');
      return null;
    }

    return item.value;
  }

  setStoredData(data: { fact: string, img: string, revisedPrompt: string }): void {
    this.fact = data.fact;
    this.imageUrl = data.img;
    this.revisedPrompt = data.revisedPrompt;
  }

  getExpiryTimeFor1AMAnd1130AM(): number {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const nextExpiry = new Date();

    if (currentHour < 1 || (currentHour === 1 && currentMinutes < 0)) {
      nextExpiry.setHours(1, 0, 0, 0); // 1 AM today
    } else if (currentHour < 11 || (currentHour === 11 && currentMinutes < 30)) {
      nextExpiry.setHours(11, 30, 0, 0); // 11:30 AM today
    } else {
      nextExpiry.setDate(nextExpiry.getDate() + 1);
      nextExpiry.setHours(1, 0, 0, 0); // 1 AM tomorrow
    }

    return nextExpiry.getTime();
  }
}
