import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from 'src/models/professor';
import { User } from 'src/models/user';
const url="http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  authenticate(user:User):Observable<any>{
    return this.http.post<User>(url+"authenticate",user)
  }

  registerProfessor(professor:Professor){
    return this.http.post<Professor>(url+"addProfessor",professor)
  }
  register(user:User){
    return this.http.post<User>(url+"signup",user)
  }

  getDetails(token:string):Observable<any>{
    return this.http.get<any>(url+'getDetails/'+token)
  }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(url+'getUsers')
  }

  updateUser(user:User){
    return this.http.patch(url+'updateUser',user)
  }

  deleteUser(email:String){
    return this.http.delete(url+'deleteUser/'+email)
  }
}
