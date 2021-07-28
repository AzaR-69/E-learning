import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn=false
  constructor(private router:Router,private authService:AuthService,private tokenService:TokenService) { }
  user:User=new User
  err=""
  ngOnInit(): void {
    if(!!this.tokenService.getToken()){
      this.isLoggedIn=true
    }
  }

  signIn(){
    this.authService.authenticate(this.user).subscribe(
      result=>{
        this.tokenService.saveToken(result.token)
        console.log("Success")
        this.router.navigate(['/dashboard'])
      },
      error=>this.err="Bad Credentials"
    )
  }
}
