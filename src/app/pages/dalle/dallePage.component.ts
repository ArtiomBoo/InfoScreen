import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {INews} from "../../models/news";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IDalleImage} from "../../models/dalleImage";
import {ActivatedRoute} from "@angular/router";
import {EnvironmentService} from "../../services/environment.service";

@Component({
  selector: 'app-root',
  templateUrl: './dallePage.component.html',
  styleUrls: ['./dallePage.component.scss'],
})
export class DallePageComponent implements OnInit{

  private dalleUrl: string;
  private dalleApiKey: string;

  imageUrl: string = 'https://epaper.dainikgomantak.com/smartepaper/UI/images/giphy.gif';
  revisedPrompt: string = '';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private envService: EnvironmentService  // Inject EnvironmentService
  ) {
    // Fetch environment values
    this.dalleUrl = this.envService.getDalleUrl();
    this.dalleApiKey = this.envService.getDalleApiKey();
  }

  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
      const promptFromUrl = params['prompt'];
      const cacheFromUrl = params['cache'];

      const storedResponse = cacheFromUrl !== 'false' ? this.getStoredResponse() : null;

      if (storedResponse) {
        this.setImageData(storedResponse);
      } else {
        this.generateImage(promptFromUrl).subscribe({
          next: (response) => this.handleResponse(response),
          error: (error) => console.error('Error:', error)
        });
      }
    });
  }

  generateImage(prompt: string): Observable<IDalleImage> {
    const url = this.dalleUrl;

    const headers = new HttpHeaders({
      'api-key': this.dalleApiKey
    });

    const body = {
      prompt: prompt,
      n: 1,
      size: '1024x1024'
    };

    return this.http.post<IDalleImage>(url, body, { headers: headers });
  }

  handleResponse(response: IDalleImage): void {
    if (response.data.length > 0) {
      this.setImageData(response);
      this.storeResponse(response);
    }
  }

  setImageData(response: IDalleImage): void {
    this.imageUrl = response.data[0].url;
    this.revisedPrompt = response.data[0].revised_prompt;
  }

  storeResponse(data: IDalleImage): void {
    const expiryTime = this.getExpiryTimeFor3AM();
    const item = {
      value: data,
      expiry: expiryTime
    };
    localStorage.setItem('dalleResponse', JSON.stringify(item));
  }

  getStoredResponse(): IDalleImage | null {
    const itemStr = localStorage.getItem('dalleResponse');
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now >= item.expiry) {
      localStorage.removeItem('dalleResponse');
      return null;
    }

    return item.value;
  }

  getExpiryTimeFor3AM(): number {
    const now = new Date();
    let expiry = new Date();

    expiry.setHours(3, 0, 0, 0);

    if (now.getTime() > expiry.getTime()) {
      expiry.setDate(expiry.getDate() + 1);
    }

    return expiry.getTime();
  }

}
