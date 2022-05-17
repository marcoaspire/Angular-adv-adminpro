import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { map, catchError,tap,delay } from "rxjs/operators";
import { of,Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { Register } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoadUser } from '../interfaces/load-users.interface';


const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2:any;
  public user!:User;

  constructor(private http:HttpClient, private router:Router,
              private ngZone:NgZone
    
    ) {   }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get id():number{
    return this.user.userID|| -1;
  }

  get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/login');

    });
  }

  tokenValidation():Observable<boolean>{

    return this.http.get(`${base_url}/Auth/renew`, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const  { email,google,img,name,role,userID}=resp.user;
        this.user=new User(google,name,email,'',img,role,userID);
        
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(err=> {
        console.log(err);
        
       return of(false);
      }
      )
    );

  }


  createUser(formData:Register){
    return this.http.post(`${base_url}/User`, formData).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token.token)
      })
    )
  }

  updateUser(data:{email:string, name:string, role:string}){
    data ={
      ...data,
      role:this.user.role || 'USER_ROLE'
    }
    return this.http.put(`${base_url}/User/${this.id}`, data,this.headers
    );
  }

  loadUsers(from:number=1){
      // http://localhost:5516/api/User?from=3
      return this.http.get<LoadUser>(`${base_url}/User?from=${from}`,this.headers)
      .pipe(
        delay(500),
        map(resp =>{
          const users = resp.users.map(user => new User(user.google,user.name,user.email,'',user.img,user.role,user.userID) )
          return {
            total:resp.total,
            users
          };
        })
      )
      ;
  }

  deleteUser(user:User){
    http://localhost:5516/api/User/13
    return this.http.delete(`${base_url}/User/${user.userID}`,this.headers);
  }

  saveUser(user:User){
    
    return this.http.put(`${base_url}/User/${user.userID}`, user,this.headers
    );
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

  loginGoogle(token:string){
    const url = `${base_url}/Auth/google`;
    return this.http.post(url,{token}).pipe(
      tap( (resp:any) => {
        console.log(resp);
        
        localStorage.setItem('token', resp.token.token)
      }       
      )
    );
  }


}
