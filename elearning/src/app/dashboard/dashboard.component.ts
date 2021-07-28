import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService,private tokenService:TokenService,private router:Router) { }
  
  token=""
  isUser=false
  isAdmin=false
  isProfessor=false

  ngOnInit(): void {
    this.token=this.tokenService.getToken()
    if(!!this.token){
      this.auth.getDetails(this.token).subscribe(
        data=>{this.isUser=data.role==="ROLE_USER",this.isAdmin=data.role==="ROLE_ADMIN",this.isProfessor=data.role==="ROLE_PROFESSOR"},
        error=>console.log(error)
      )
    }
    else{
      this.router.navigate(['/login'])
    }
  }

}
