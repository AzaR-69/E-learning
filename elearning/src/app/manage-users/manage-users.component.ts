import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  result=false
  users:User[]=[]
  editable=false
  user:User=new User
  constructor(private router:Router,private token:TokenService,private auth:AuthService) { }

  ngOnInit(): void {
    if(!!this.token.getToken()){
      this.getDetails(this.token.getToken())
      this.auth.getUsers().subscribe(
        data=>this.users=data,error=>console.log(error)
      )
    }
    else{
      this.router.navigate(['/dashboard'])
    }
  }

  getDetails(token:any){
    this.auth.getDetails(token).subscribe(
      data=>data.role==="ROLE_ADMIN"?"":this.router.navigate(['/dashboard']),error=>console.log(error)
    )
  }

  edit(User:User){
    this.user=User
    this.editable=!this.editable
  }

  updateProfile(){
    this.auth.updateUser(this.user).subscribe(
      data=>{console.log("Success"),this.editable=!this.editable},error=>console.log(error)
    )
  }

  delete(email:String){
    this.auth.deleteUser(email).subscribe(
      data=>this.ngOnInit(),error=>console.log(error)
    )
  }
}
