import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
//Maintenances
import { UsersComponent } from './maintenances/users/users.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { DoctorComponent } from './maintenances/doctors/doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';



const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      { path:'', component: DashboardComponent,data:{title:'Dashboard'}},
      { path:'account-settings', component: AccountSettingsComponent,data:{title:'Account'}},
      { path:'search/:arg', component: SearchComponent,data:{title:'Search'}},  
      { path:'chart1', component: Graph1Component,data:{title:'Chart1'}},
      { path:'profile', component: ProfileComponent,data:{title:'Profile'}},
      { path:'progress', component: ProgressComponent,data:{title:'Progress'}},
      { path:'promises', component: PromisesComponent,data:{title:'Promises'}},
      { path:'rxjs', component: RxjsComponent,data:{title:'Rxjs'}},
      //Maintenances
      { path:'hospitals', component: HospitalsComponent,data:{title:'Application hospitals'}},
      { path:'doctors', component: DoctorsComponent,data:{title:'Application doctors'}},
      { path:'doctor/:id', component: DoctorComponent,data:{title:'Application doctors'}},
      //admin
      { path:'users', 
        canActivate: [AdminGuard],
        component: UsersComponent,data:{title:'Application users'}},


      { path:'**', redirectTo: 'dashboard', pathMatch:'full'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
