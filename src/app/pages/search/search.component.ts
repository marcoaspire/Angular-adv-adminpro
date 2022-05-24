import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users:User[]=[];
  public doctors:Doctor[]=[];
  public hospitals:Hospital[]=[];



  constructor(private activatedRoute:ActivatedRoute, private searchService:SearchService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      ({arg}) =>{

        this.globalSearch(arg);
        
      }
    );

  }


  globalSearch(arg:string){

    this.searchService.globalSearch(arg)
    .subscribe( (resp:any) => {
      this.users=resp.users;
      this.hospitals=resp.hospitals;
      this.doctors=resp.doctors;

      console.log(resp);  
      
    })
    
  }

  openDoctor(doctor:Doctor){
    console.log(doctor);
    
  }
}
