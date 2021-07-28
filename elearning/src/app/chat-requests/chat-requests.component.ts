import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/models/chat';
import { AuthService } from 'src/services/auth.service';
import { ChatService } from 'src/services/chat.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.component.html',
  styleUrls: ['./chat-requests.component.css']
})
export class ChatRequestsComponent implements OnInit {
  userId=""
  messages:Chat[]=[]
  message:Chat=new Chat
  chatbox=false
  constructor(private auth:AuthService,private chat:ChatService,private token:TokenService,private router:Router) { }

  ngOnInit(): void {
    if(!!this.token.getToken()){  
      this.auth.getDetails(this.token.getToken()).subscribe(
        data=>{data.role==="ROLE_PROFESSOR"?"":this.router.navigate(['/dashboard']),this.getAllMessages(data.username)},error=>console.log(error)
      )
    }
    else{
      this.router.navigate(['/login'])
    }
    setTimeout(() => { this.ngOnInit() }, 1000 * 10)
  }

  getAllMessages(professorUsername:string){
    this.chat.getProfessorMessages(professorUsername).subscribe(
      data=>{this.messages=data},error=>console.log(error)
    )
  }

  enableChat(msg:Chat){
    this.message=msg
    this.chatbox=!this.chatbox
  }

  clearConversation(msg:Chat){
    this.chat.deleteMessages(msg.userId,msg.professorId).subscribe(
      data=>{console.log("Success"),this.ngOnInit()},error=>console.log(error)
    )
  }
}
