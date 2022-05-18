import { Injectable } from '@angular/core';
import { Article } from "./article/article";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import {ArticleCreation} from "./article-creation/article-creation";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}?_expand=author`);
  }

  public getArticles() : Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles?_expand=author`);
  }

  public getLastArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles?_expand=author&_sort=publishedOn&_order=desc&_limit=10`)
  }

  public deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/articles/${id}`);
  }

  public createArticle(article: ArticleCreation): Observable<any> {
    return this.http.post(`http://localhost:3000/articles`, article);
  }
}
