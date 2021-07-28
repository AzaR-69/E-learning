import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  key = "AIzaSyCd-RcylIWgOYIO9UqZPBi_sF0qofY_Jv0";
  constructor(private httpClient: HttpClient) {}

  getBooks(query: string) {
    return this.httpClient.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=39&keyes&key=${this.key}`
    );
  }

  sortedBooks(query:string,sort:string){
    return this.httpClient.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=${sort}&key=${this.key}`)
  }
}
