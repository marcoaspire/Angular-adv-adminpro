import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public user!:User;

  constructor(private userService:UserService, private router:Router) { 
    this.user=userService.user;
    //this.imgUrl= userService.user.imageURL;

  }

  logout(){
    this.userService.logout();
  }

  search(arg:string){
    if (arg.length === 0)
    {
      return;
    }
    console.log(arg);
    this.router.navigateByUrl(`dashboard/search/${arg}`);
    

  }
}
