import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
//
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes= [

    {
      path: 'dashboard',
      loadChildren: () => import ('./pages/pages.module').then(m => m.PagesModule)
    },
    {
      path: '',
      loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule)
    },
    // {
    //   path: '',
    //   redirectTo: 'dashboard'
    // },


    { path:'**', component: NopagefoundComponent},
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    //PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
