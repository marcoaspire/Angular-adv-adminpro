import { Component, OnInit } from '@angular/core';
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

  menuItems!: any[];
  public user!:User;


  constructor(private sidebarService:SidebarService,private userService:UserService) {
    this.user= userService.user;
   }

  ngOnInit(): void {
    this.menuItems=this.sidebarService.menu;
  }

}
