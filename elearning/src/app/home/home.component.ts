import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false
  username = ""
  token = ""
  constructor(private auth: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    setInterval(() => this.refresh(), 100)
  }

  logout() {
    this.tokenService.signOut()
  }
  refresh() {
    this.token = this.tokenService.getToken()
    this.isLoggedIn = !!this.token
    if (this.isLoggedIn) {
      this.auth.getDetails(this.token).subscribe(
        data => this.username = data.username, error => console.log(error)
      )
    }
  }
}
