import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import {  delay } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[]=[];
  public user!:User;


  constructor(public sidebarService:SidebarService,private userService:UserService) {
    this.user= userService.user;
   }

  ngOnInit(): void {
  }

}
