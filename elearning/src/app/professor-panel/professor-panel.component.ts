import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/models/chat';
import { Professor } from 'src/models/professor';
import { AuthService } from 'src/services/auth.service';
import { ChatService } from 'src/services/chat.service';
import { ProfessorService } from 'src/services/professor.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-professor-panel',
  templateUrl: './professor-panel.component.html',
  styleUrls: ['./professor-panel.component.css']
})
export class ProfessorPanelComponent implements OnInit {
  professors: Professor[] = []
  professor: Professor = new Professor()
  isUser = false
  isProfessor = false
  message: Chat = new Chat
  messages: Chat[] = []
  connect = false
  constructor(private auth: AuthService, private chatService: ChatService, private professorService: ProfessorService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (!!this.tokenService.getToken()) {
      this.professorService.getRequests().subscribe(
        data => { this.professors = data, this.getDetails(this.tokenService.getToken()) }, error => console.log(error)
      )
    }
    else {
      this.router.navigate(['/login'])
    }
  }

  getDetails(token: any) {
    this.auth.getDetails(token).subscribe(
      data => { this.message.userId = data.userId, this.message.username = data.username }, error => console.log(error)
    )
  }

  enableChat(prof: Professor) {
    this.professor = prof
    this.connect = !this.connect
    this.message.professorId = this.professor.professorId
    this.message.professorUsername=this.professor.username
  }


}
