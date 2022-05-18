import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author} from "./author/author";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for requests on Author route
 */
export class AuthorService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.baseUrl}/authors`);
  }

  /**
   * Retrieve an author by given id
   *
   * @param id Author id to find
   */
  public getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/authors/${id}`);
  }

}
