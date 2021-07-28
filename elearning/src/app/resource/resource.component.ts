import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resource } from 'src/models/resource';
import { AuthService } from 'src/services/auth.service';
import { ResourceService } from 'src/services/resource.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  token=""
  isUser=false
  isProfessor=false
  isAdmin=false
  isSuccessful=false
  error=false
  resource:Resource=new Resource
  resources:Resource[]=[]
  constructor(private resourceService:ResourceService,private tokenService:TokenService,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.token=this.tokenService.getToken()
    if(!!this.token){
      this.getDetails()
      this.getLinks()
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  getDetails(){
    this.auth.getDetails(this.token).subscribe(
      data=>{this.isUser=data.role==="ROLE_USER",this.isProfessor=data.role==="ROLE_PROFESSOR",this.isAdmin=data.role==="ROLE_ADMIN"},
      error=>console.log(error)
    )
  }

  goBack(){
    this.isSuccessful=false
    this.error=false
    this.resource=new Resource()
  }

  add(){
    this.resourceService.addLink(this.resource).subscribe(
      data=>this.isSuccessful=!this.isSuccessful,error=>{console.log(error),this.error=!this.error}
    )
  }

  getLinks(){
    this.resourceService.getLinks().subscribe(data=>this.resources=data,error=>console.log(error))
  }
}
