import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="http://localhost:8080/send/"
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  successMail(email:string):Observable<any>{
    return this.http.get(`http://localhost:8080/send/approved/${email}`,{responseType:'text'})
  }

  rejectMail(email:string):Observable<any>{
    return this.http.get(`http://localhost:8080/send/rejected/${email}`,{responseType:'text'})
  }
}
