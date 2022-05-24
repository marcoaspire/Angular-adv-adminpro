import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

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

  private  convertUsers(results:any[]): User[]
  {

    return results.map(
      user => new User(user.google,user.name,user.email,'',user.img,user.role,user.userID) 
    );
  }

  search(type:'users'|'doctors'|'hospitals', term:string){
    // http://localhost:5516/api/Searches/collection/users/test
    return this.http.get(`${base_url}/Searches/collection/${type}/${term}`,this.headers)
    .pipe(
      map((resp:any) => {
        
        switch (type) {
          case 'users':
              return this.convertUsers(resp.users);
            break;
            case 'hospitals':
              return resp.hospitals;
            break;
            case 'doctors':
              return resp.doctors;
            break;
          default:
            return [];
            break;
        }

      })
    );
  }


  globalSearch( term:string){
    //http://localhost:5516/api/Searches/all/juan
    return this.http.get(`${base_url}/Searches/all/${term}`,this.headers);


  }

}
