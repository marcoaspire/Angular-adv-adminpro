import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError,tap } from "rxjs/operators";
import { of,Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Register } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {   }

  createUser(formData:Register){
    return this.http.post(`${base_url}/User`, formData).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token.token)
      })
    )
  }
  
  login(formData:LoginForm){
    const url = `${base_url}/Auth`;
    
    console.log(formData);

    return this.http.post(url,formData).pipe(
      tap( (resp:any) => {
        
        localStorage.setItem('token', resp.token.token)
      }       
      )
    );
  }


}
