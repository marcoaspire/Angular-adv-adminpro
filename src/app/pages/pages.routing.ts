import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children: [
      { path:'', component: DashboardComponent},
      { path:'progress', component: ProgressComponent},
      { path:'chart1', component: Graph1Component},
      { path:'account-settings', component: AccountSettingsComponent},


      { path:'**', redirectTo: 'dashboard', pathMatch:'full'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
