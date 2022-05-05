import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    PagesRoutingModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent
  ]
})
export class PagesModule { }
