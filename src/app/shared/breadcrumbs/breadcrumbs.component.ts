import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {
  public title:string ='';
  public titleSubs$: Subscription;

  constructor( private router:Router) {
    //
    this.titleSubs$=this.getParams()
    .subscribe( ({title}) =>{
      this.title=title;
      document.title=`AdminPro - ${title}`;
    });

   }


   getParams(){
    return this.router.events.pipe(
      filter((event:any) => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map(event => event.snapshot.data)
    );
   }


}
