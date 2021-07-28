import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Professor } from 'src/models/professor';
import { AuthService } from 'src/services/auth.service';
import { EmailService } from 'src/services/email.service';
import { ProfessorService } from 'src/services/professor.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-professor-requests',
  templateUrl: './professor-requests.component.html',
  styleUrls: ['./professor-requests.component.css']
})
export class ProfessorRequestsComponent implements OnInit {
  verify=false
  imageBlobUrl: SafeUrl | null = null;
  professors:Professor[]=[]
  professorNew:Professor=new Professor
  constructor(private emailService:EmailService,private sanitizer: DomSanitizer,private professorService:ProfessorService,private auth:AuthService,private token:TokenService,private router:Router) { }

  ngOnInit(): void {
    if(!!this.token.getToken() ){
      this.professorService.getRequests().subscribe(
        result=>{this.professors=result,this.getDetails(this.token.getToken())},
        error=>console.log(error)
      )
    }
    else{
      this.redirect()
    }
  }

  redirect(){
    this.router.navigate(['/dashboard'])
  }

  getDetails(token:any){
    this.auth.getDetails(token).subscribe(
      data=>data.role==="ROLE_ADMIN"?"":this.redirect(),error=>console.log(error)
    )
  }
  
  verifyDetails(professor:Professor){
    this.verify=true
    this.professorNew=professor
    const mediaType = 'application/image';
    this.professorService.getIdCard(this.professorNew.professorId).subscribe((result) => {
      const blob = new Blob([result], { type: mediaType });
      const unsafeImg = URL.createObjectURL(blob);
      this.imageBlobUrl= this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    },
    response => {
      console.log("POST - getThumbnail - in error", response);
    },
    () => {
      console.log("POST - getThumbnail - observable is now completed.");
    }
    )
  }

  approveMail(prof:Professor){
    this.emailService.successMail(prof.email).subscribe(
      result=>{console.log("success"),this.register(prof)},error=>console.log(error))
    
  }

  rejectMail(email:string,id:any){
    this.emailService.rejectMail(email).subscribe(
      result=>{console.log("success"),this.professorService.deleteById(id).subscribe(
        data=> this.router.navigate(['/dashboard']),err=>console.log(err))},error=>console.log(error))
    
  }

  register(Prof:Professor){
    this.auth.registerProfessor(Prof).subscribe(
      data=> this.router.navigate(['/dashboard']),err=>console.log(err))
  }
   
}
