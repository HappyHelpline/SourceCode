import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginService } from '../../services/login.service';
import { AlertService } from '../../services/alert.service';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  private message: string;
  public loading: boolean;
  private response: any;
  public type: string;
  public email: string;
  public otp: string;
  public mobileverify: boolean;
  public mobileOtpVerify: boolean;
  public loginflag: boolean; //true & false condition
  public emailverify: boolean;
  public emailOtpVerify: boolean;
  public thankumessages: boolean;
  public mobileverifyflag: boolean;
  typeOfUserArray = [];
  public typeofLogin;
  constructor(private _loginServiceobj: LoginService, private _dataStorage: DataStorageService, private _alertService: AlertService) {
    // this.username="India";
    // this.password="ghjsdf";
  }
  ngOnInit() {
    //false condition
    this.loginflag = true; //flag
    this.loading = false;
    this.mobileverifyflag = false;
    this.emailverify = false;
    this.emailOtpVerify = false;
    this.thankumessages = false;
    this.mobileverify = false;

    //console.log('On init method of login component');
    this.typeOfUserArray = [{ type: "client" },
    { type: "volunteer" }]
  }
  typeofUserFunc(typeOfUser) {
    this.typeofLogin = typeOfUser
  }
  // Submit Login Form
  submitLogin() {
    this.loading = true;
    if (this.typeofLogin == "client") {
      let loginObj = {
        username: this.username,
        password: this.password,
        type: this.typeofLogin
      };
      this._loginServiceobj.doLoginSubmitAsClient(loginObj).subscribe(res => {
       
        this.loading = false;
        this.response = res;
      
        if (parseInt(this.response.status) == 1) {
          //console.log(this.response);
          this._alertService.success(this.response.msg, true);
          sessionStorage.setItem('userType', this.typeofLogin);
          sessionStorage.setItem('clientObj', JSON.stringify(this.response.client));
          sessionStorage.setItem('volunteerObj', JSON.stringify(this.response.volunter));
          sessionStorage.setItem('appointment', JSON.stringify(this.response.appointment));
          // localStorage.setItem('userType', "Jay");
          this._loginServiceobj.navigateUrl('dashboardcl');
        }
        else {
          this._alertService.error(this.response.msg, true);
        }
      },
        err => {
          this.loading = false;
          this._alertService.error("Network error");
        });
    }
    else if (this.typeofLogin == "volunteer") {
      let loginObj = {
        username: this.username,
        password: this.password,
        type: this.typeofLogin
      };
      this._loginServiceobj.doLoginSubmitAsVolunteer(loginObj).subscribe(res => {
        this.loading = false;
        this.response = res;
        //console.log(this.response);
        //console.log()
        if (parseInt(this.response.status) == 1) {
          this._alertService.success(this.response.msg, true);
          sessionStorage.setItem('userType', this.typeofLogin);
          sessionStorage.setItem('clientObj', JSON.stringify(this.response.client));
          sessionStorage.setItem('volunteerObj', JSON.stringify(this.response.profile));
          sessionStorage.setItem('appointment', JSON.stringify(this.response.appointment));
          this._loginServiceobj.navigateUrl('dashboard');
        }
        else {
          this._alertService.error(this.response.msg, true);
        }
      },
        err => {
          this.loading = false;
          this._alertService.error("Network error");

        });
    }
    else {
      this.loading = false;
      this._alertService.error("Choose Login type first");
    }
  }
  Logout() {
    //sessionStorage.removeItem('userType');
    sessionStorage.clear();
    this._alertService.success('Logout Successfully', true);
    this._loginServiceobj.expireToken();
    this._loginServiceobj.navigateUrl('login');
  }
}
