import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  getTitle(): string {
    return window.env?.TITLE || 'TITLE';
  }

  getDalleUrl(): string {
    return window.env?.DALLE_URL || '';
  }

  getChatGptUrl(): string {
    return window.env?.CHATGPT_URL || '';
  }

  getDalleApiKey(): string {
    return window.env?.DALLE_API_KEY || '';
  }

  getChatGptApiKey(): string {
    return window.env?.CHATGPT_API_KEY || '';
  }
}
