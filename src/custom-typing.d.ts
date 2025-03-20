declare global {
  interface Window {
    env: {
      TITLE: string;
      DALLE_URL: string;
      DALLE_API_KEY: string;
      CHATGPT_URL: string;
      CHATGPT_API_KEY: string;
    };
  }
}

export {};
