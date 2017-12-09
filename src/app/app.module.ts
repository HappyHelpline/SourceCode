import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgSwitch } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingModule } from 'ngx-loading';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';



//SERVICES 
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UrlManagerService } from './services/url-manager.service';
import { AlertService } from './services/alert.service';
import { ApiManagerService } from './services/api-manager.service';
import { LoginService } from './services/login.service';
import { DataStorageService } from './services/data-storage.service';
import { RegistrationService } from './services/registration.service';
import { InventoryService } from './services/inventory.service';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { UserprofileService } from './services/userprofile.service';

// MAIN APPLICATION COMPONENTS
import { AppComponent } from './components/app.component';
import { AppRoutingModule } from './app.routing';

// APP LANDING COMPONENT
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { RegistrationComponent } from './components/registration/registration.component';

// ALERT COMPONENT
import { AlertComponent } from './components/alert/alert.component';

// DASHBOARD COMPONENTS
import { DashbootstrapComponent } from './components/dashbootstrap/dashbootstrap.component';
import { HomeComponent } from './components/dashbootstrap/dashboard/home/home.component';
import { DashclientComponent } from './components/dashbootstrap/dashboard/dashclient/dashclient.component';
import { UserComponent } from './components/dashbootstrap/dashboard/user/user.component';
import { SidebarModule } from './components/dashbootstrap/dashboard/sidebar/sidebar.module';
import { NavbarModule } from './components/dashbootstrap/dashboard/shared/navbar/navbar.module';
import { FooterModule } from './components/dashbootstrap/dashboard/shared/footer/footer.module';

// DASHBOARD INTERNAL COMPONENTS
import { LbdModule } from './components/dashbootstrap/dashboard/lbd/lbd.module';
import { EmailverifyComponent } from './components/dashbootstrap/dashboard/emailverify/emailverify.component';
import { ResetpwdComponent } from './components/dashbootstrap/dashboard/resetpwd/resetpwd.component';

//viewappointment
import { ProductComponent } from './components/dashbootstrap/dashboard/viewAppointment/product.component';
import { ViewemiComponent } from './components/dashbootstrap/dashboard/viewAppointment/viewemi/viewemi.component';

//takeappointment
import { ViewComponent } from './components/dashbootstrap/dashboard/takeAppointment/view.component';
import { ViewcustomerComponent } from './components/dashbootstrap/dashboard/takeAppointment/viewcustomer/viewcustomer.component';



//  ------------------------------------ Requirements ---------------------------------------//
const Modules = [
  BrowserModule, FormsModule, HttpModule, NavbarModule, FooterModule, SidebarModule, RouterModule,
  AppRoutingModule, LbdModule, NgxDatatableModule, LoadingModule, CommonModule,
  NgDragDropModule.forRoot(), NgbModule.forRoot(), MultiselectDropdownModule ,Ng2DatetimePickerModule
];

const Services = [
  AuthService, AuthGuardService, LoginService, ApiManagerService, DataStorageService, AlertService, RegistrationService, InventoryService, UrlManagerService, ProductService, CustomerService, UserprofileService
];

const Components = [
  AppComponent, HomeComponent, UserComponent, 
  RegistrationComponent, LoginComponent, LandingComponent, HeaderComponent, FooterComponent, DashbootstrapComponent, ForgetpasswordComponent,  AlertComponent, PageNotFoundComponent, ProductComponent,   ViewComponent,ViewcustomerComponent, ViewemiComponent,  ResetpwdComponent,EmailverifyComponent, DashclientComponent
];
//-----------------------------------------------END----------------------------------------------//
@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  providers: [...Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
