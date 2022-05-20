import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError,tap,delay } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { LoadUser } from '../interfaces/load-users.interface';
import { Hospital } from '../models/hospital.model';


const base_url= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient, private router:Router) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }
  
  loadHospitals(){
    // http://localhost:5516/api/User?from=3
    return this.http.get<any>(`${base_url}/hospitals`,this.headers)
    .pipe(
      map( 
        (res: {ok:boolean, hospitals:Hospital[]}) => res.hospitals)
    )
  }

  newHospital( name:string){
    // http://localhost:5516/api/Hospitals
    return this.http.post(`${base_url}/hospitals`,{name},this.headers);
  }

  updateHospital( id:number,name:string){
    // http://localhost:5516/api/Hospitals/5
    return this.http.put(`${base_url}/hospitals/${id}`,{name},this.headers);
  }


  deleteHospital( id:number){
    // http://localhost:5516/api/Hospitals/3
    return this.http.delete(`${base_url}/hospitals/${id}`,this.headers);
  }



}
