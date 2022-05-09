import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[
    {
      title:'Dashboard!!',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main' , url: '/dashboard'},
        { title: 'Progress' , url: 'progress'},
        { title: 'Chart1' , url: 'chart1'},
        { title: 'Promises' , url: 'promises'},
        { title: 'Rxjs' , url: 'rxjs'},

      ]
    },


  ];
  constructor() { }
}
