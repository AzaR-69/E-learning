import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { SearchService } from 'src/services/search.service';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { TokenService } from 'src/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css']
})
export class EbookComponent implements OnInit {
  items: any=[]
  loading = false
  sort=""
  sortBool=false
  query: FormControl = new FormControl()
  constructor(private searchService: SearchService, private formBuilder: FormBuilder,private tokenService:TokenService,private router:Router) { }

  ngOnInit(): void {
    if(!!this.tokenService.getToken()){
      this.getEbooks()
    }
    else{
      this.router.navigate(['/login'])
    }
    
  }

  getEbooks(){
    this.query.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: any) => {
        let te = query.replace(/\s/g, "");
        if (te.length > 2) {
          if(this.sort){
            this.searchService.sortedBooks(query,this.sort).subscribe((result: any) => {
              this.loading = true;
              this.items = result.items;
            },error=>console.log(error));
          }
          else{
          this.searchService.getBooks(query).subscribe((result: any) => {
            this.loading = true;
            this.items = result.items;
          });
        }
      }
      });
  }
}
