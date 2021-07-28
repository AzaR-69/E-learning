import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Chat } from 'src/models/chat';
import { Message } from 'src/models/message';
import { Professor } from 'src/models/professor';
import { AuthService } from 'src/services/auth.service';
import { ChatService } from 'src/services/chat.service';
import { ProfessorService } from 'src/services/professor.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {
  private updateSubscription!: Subscription;
  token = ""
  userId: any
  isUser = false
  isProfessor = false
  professor: Professor = new Professor()
  @Input('message') message: Chat = new Chat
  messages: Chat[] = []
  constructor(private auth: AuthService, private chatService: ChatService, private professorService: ProfessorService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken()
    if (!!this.token) {
      this.auth.getDetails(this.token).subscribe(
        data => {
          this.isUser = data.role === "ROLE_USER", this.isProfessor = data.role === "ROLE_PROFESSOR",
          this.userId = data.userId, this.getProfessor(), this.getMessages()
        },
        error => console.log(error)
      )
    }
    setTimeout(() => { this.ngOnInit() }, 1000 * 10)
  }

  getProfessor() {
    this.professorService.getById(this.message.professorId).subscribe(
      data => this.professor = data, error => console.log(error)
    )
  }

  getMessages() {
    this.chatService.getMessages(this.message.userId, this.message.professorId).subscribe(
      data => { this.messages = data, this.isProfessor ? (this.message.id = this.messages[this.messages.length - 1].id)(this.message.message=this.messages[this.messages.length - 1].message): ""}, error => console.log(error)
      // data => { this.messages = data, this.isProfessor ? this.message.id = ((this.messages[this.messages.length - 1].message) ? this.messages[this.messages.length - 1].id : this.message.id) : "", console.log(this.isProfessor) }, error => console.log(error)
      )
  }

  sendMessage() {
    this.chatService.sendMessage(this.message).subscribe(
      data => { console.log("Sent Successfully"), this.message.message = "", this.message.response = "", this.ngOnInit() }, error => console.log(error)
    )
  }
  respond() {
    this.chatService.respond(this.message).subscribe(
      data => { console.log("Sent Successfully"), this.message.message = "", this.message.response = "", this.ngOnInit() }, error => console.log(error)
    )
  }
}
