import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {INews} from "../models/news";

@Injectable({
  providedIn: "root"
})
export class NewsService{
  constructor(private http:HttpClient) {
  }

  getKode24Rss(): Observable<INews> {
    return this.http.get<INews>("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.kode24.no%2F")
      .pipe(
        map(response => {
          // Assuming 'items' is the array inside the IVg object
          response.items = response.items.slice(0, 9);
          return response;
        })
      );
  }

  getNrkRss(): Observable<INews> {
    return this.http.get<INews>("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.nrk.no%2Ftoppsaker.rss")
      .pipe(
        map(response => {
          // Assuming 'items' is the array inside the IVg object
          response.items = response.items.slice(0, 9);
          return response;
        })
      );
  }

  getVgRss(): Observable<INews> {
    return this.http.get<INews>("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.vg.no%2Frss%2Ffeed")
      .pipe(
        map(response => {
          // Assuming 'items' is the array inside the IVg object
          response.items = response.items.slice(0, 9);
          return response;
        })
      );
  }
}
