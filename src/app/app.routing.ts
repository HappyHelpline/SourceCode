import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//SERVICES
import { AuthGuardService } from './services/auth-guard.service';  

// PAGENOT FOUND
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// public view
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
//private view
import { DashbootstrapComponent } from './components/dashbootstrap/dashbootstrap.component';
import { UserComponent } from './components/dashbootstrap/dashboard/user/user.component';
import { EmailverifyComponent } from './components/dashbootstrap/dashboard/emailverify/emailverify.component'
import { ResetpwdComponent } from './components/dashbootstrap/dashboard/resetpwd/resetpwd.component';

//dashboard for volunteer
import { HomeComponent } from './components/dashbootstrap/dashboard/home/home.component'; 
//viewappointment
import { ProductComponent } from './components/dashbootstrap/dashboard/viewAppointment/product.component';
import { ViewemiComponent } from './components/dashbootstrap/dashboard/viewAppointment/viewemi/viewemi.component';
// viewappointment

//dashboard for client
import { DashclientComponent } from './components/dashbootstrap/dashboard/dashclient/dashclient.component';
//takeappointment
import { ViewComponent } from './components/dashbootstrap/dashboard/takeAppointment/view.component';
import { ViewcustomerComponent } from './components/dashbootstrap/dashboard/takeAppointment/viewcustomer/viewcustomer.component';
/*takeappointment*/


const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'forgetpassword', component: ForgetpasswordComponent, pathMatch: 'full' },
  {
    path: 'panel', component: DashbootstrapComponent, children: [
      { path: 'dashboard', component: HomeComponent },
      { path:'dashboardclient', component: DashclientComponent},
      { path: 'viewappointment', component: ProductComponent, children: [
          { path: '', redirectTo: 'appointment', pathMatch: 'full' },
          { path: 'appointment', component: ViewemiComponent }
        ]
      },
      { path: 'takeappointment', component: ViewComponent, children: [
          { path: '', redirectTo: 'viewdoctor', pathMatch: 'full' },
          { path: 'viewdoctor', component: ViewcustomerComponent }
        ]
      },
      { path: 'resetpwd', component: ResetpwdComponent },
      { path: 'emailverify', component: EmailverifyComponent },
      { path: 'user', component: UserComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
