import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor.model';
import { map, catchError,tap,delay } from "rxjs/operators";
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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

  loadDoctors(){
    //http://localhost:5516/api/doctors
    return this.http.get<any>(`${base_url}/doctors`,this.headers)
    .pipe(
      map( 
        (res: {ok:boolean, doctors:Doctor[]}) => res.doctors)
    )
  }

  newDoctor( doctor:Doctor){
    // http://localhost:5516/api/doctors
    
    return this.http.post(`${base_url}/doctors`,doctor,this.headers);
  }

  updateDoctor( doctor:Doctor){
    // http://localhost:5516/api/doctors/5
    return this.http.put(`${base_url}/doctors/${doctor.doctorID}`,doctor,this.headers);
  }


  deleteDoctor( doctor:Doctor){
    // http://localhost:5516/api/doctors/3
    return this.http.delete(`${base_url}/doctors/${doctor.doctorID}`,this.headers);
  }

  getDoctorByID(id:number){
    return this.http.get<any>(`${base_url}/doctors/${id}`,this.headers)
    .pipe(
      map( (resp: {ok:boolean,doctor:Doctor} ) => resp.doctor)
    )

  }




}
