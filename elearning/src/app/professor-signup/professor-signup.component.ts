import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/models/professor';
import { ProfessorService } from 'src/services/professor.service';

@Component({
  selector: 'app-professor-signup',
  templateUrl: './professor-signup.component.html',
  styleUrls: ['./professor-signup.component.css']
})
export class ProfessorSignupComponent implements OnInit {
  error = ""
  professorId:any;
  uploadId = false
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message: string = "";
  imageName: any;
  professor: Professor = new Professor;
  password2: string = "";
  isSuccessful=false
  
  constructor(private router:Router,private professorService: ProfessorService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  registerProfessor() {
    if (this.password2 === this.professor.password) {
      this.professorService.addProfessor(this.professor).subscribe(
        response => {
         console.log("Success"),this.isSuccessful=!this.isSuccessful
        },
        error => console.log(error)
      )
    }
    else {
      this.error = "Both passwords must match"
    }
  }

  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.professorService.addProfessorId(uploadImageData, this.professor.professorId).subscribe(
      result => {console.log("Success"),this.uploadId = !this.uploadId}, error => console.log(error)
    )

  }

  getId(){
    this.professorService.getIdCard(this.professorId).subscribe(
      result=>{
        this.retrieveResponse = result;
          this.base64Data = this.retrieveResponse;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      error=>console.log(error)
    )
  }
  deleteProfessor(){
    this.professorService.deleteById(this.professor.professorId).subscribe(
      result=>{this.uploadId = !this.uploadId,console.log("success")},error=>console.log(error)
    )
  }
}
