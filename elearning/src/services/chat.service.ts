import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/models/chat';
const url="http://localhost:8080/chat/"
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  getMessages(userId:any,professorId:any):Observable<Chat[]>{
    return this.http.get<Chat[]>(url+"getMessages/"+userId+"/"+professorId)
  }

  sendMessage(chat:Chat){
    return this.http.post<Chat>(url+"message",chat)
  }

  respond(chat:Chat){
    return this.http.patch(url+"respond",chat)
  }

  getProfessorMessages(professorUsername:string):Observable<Chat[]>{
    return this.http.get<Chat[]>(url+"professorMessages/"+professorUsername )
  }

  deleteMessages(userId:any,professorId:any){
    return this.http.delete(url+"clear/"+userId+"/"+professorId)
  }
}
