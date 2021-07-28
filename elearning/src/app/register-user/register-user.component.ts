import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  user:User=new User()
  password2=""
  error=""
  registered=false
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.password2===this.user.password){
      this.auth.register(this.user).subscribe(
        result=>{console.log("Success"),this.registered=!this.registered},error=>console.log(error)
      )
    }
    else{
      this.error="Both passwords must match"
    }
  }

}
