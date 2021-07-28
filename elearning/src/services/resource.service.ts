import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from 'src/models/resource';
const url="http://localhost:8080/resource/"
@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http:HttpClient) { }

  getLinks() : Observable<Resource[]>{
    return this.http.get<Resource[]>(url)
  }

  addLink(resource:Resource){
    return this.http.post(url+"add",resource)
  }

}
