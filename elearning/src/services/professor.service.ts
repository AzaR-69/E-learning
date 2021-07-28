import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from 'src/models/professor';
const url="http://localhost:8080/professors/"
@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http:HttpClient) { }
  
  addProfessor(professor:Professor){
    return this.http.patch<any>(url+"add",professor)
  }

  addProfessorId(image:any,id:any){
    return this.http.post(url+"addId/"+id,image)
  }

  getById(professorId:any):Observable<Professor>{
    return this.http.get<Professor>(url+'getById/'+professorId)
  }

  getRequests():Observable<any>{
    return this.http.get<Professor[]>(url)
  }
  getIdCard(professorId:any):Observable<Blob>{
    return this.http.get(url+"getImage/"+professorId,{responseType:'blob'})
  }

  deleteById(id:any){
    return this.http.delete<any>(url+"delete/"+id)
  }
}
