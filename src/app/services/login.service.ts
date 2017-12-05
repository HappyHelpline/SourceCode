import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ApiManagerService } from './api-manager.service';
import { DataStorageService } from './data-storage.service';
import { UrlManagerService } from './url-manager.service';
import { Router } from '@angular/router';


@Injectable()
export class LoginService {
  private observable: Observable<string>;
  private observer: Observer<string>;
  public profileData:Object;  // STORES THE PROFILE DATA AT LOGIN FOR PROFILE OPTION
  constructor(private _httpServiceObj: ApiManagerService, private _router: Router, private _urlmanager: UrlManagerService) {
  }
  public httpservice(url, method, body){
    this._httpServiceObj.doHttpRequest(url, method, body, false).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Submit Login'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  doLoginSubmitAsClient(Obj) {
    const url = this._urlmanager.resolveUrl('L', 'PO', 'LoginAsClient');
    const method = "POST";
    const body = Obj;
   return this.httpservice(url,method, body);
  }
  doLoginSubmitAsVolunteer(Obj) {
    const url = this._urlmanager.resolveUrl('L', 'PO', 'LoginAsClient');
    const method = "POST";
    const body = Obj;
   return this.httpservice(url,method, body);
  }
  // Generate OTP
  generateotp(forgetpasswordobj) {
    const forgetpasswordurl = this._urlmanager.resolveUrl('L', 'PO', 'GenerateOtp');
    const method = "POST";
    const body = forgetpasswordobj;
    this._httpServiceObj.doHttpRequest(forgetpasswordurl, method, body, false).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Generate OTP'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;

  }
  // verify OTP
  verifyotp(otpobj) {
    const GenerateOtpurl = this._urlmanager.resolveUrl('L', 'PO', 'verifyotp');
    const method = "POST";
    const body = otpobj;
    this._httpServiceObj.doHttpRequest(GenerateOtpurl, method, body, false).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Verify OTP'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;

  }

  //Change password
  changepwd(changepwdobj) {
    const changepwdourl = this._urlmanager.resolveUrl('L', 'PO', 'changepassword');
    const method = "POST";
    const body = changepwdobj;
    this._httpServiceObj.doHttpRequest(changepwdourl, method, body, true).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Change Password'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  resetpwd(resetpwdobj){
    const resetpasswordurl = this._urlmanager.resolveUrl('L', 'PO','resetpassword');
    const method ='POST';
    const body = resetpwdobj;
    this._httpServiceObj.doHttpRequest(resetpasswordurl,method,body,true).subscribe(res=>{
      this.observer.next(res);
      this.observer.complete();
    },err=>this.observer.error('Failed To Reset Password'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
    
  }
  //email verify
  newemailverify(emailverifyobj){
  const emailverifyurl = this._urlmanager.resolveUrl('L', 'PO','emailverify');
  const method ="POST";
  const body =emailverifyobj;
  this._httpServiceObj.doHttpRequest(emailverifyurl, method, body).subscribe(res => {
    this.observer.next(res);
    this.observer.complete();
},
err=> this.observer.error('Failed To Verify Email'));
this.observable = new Observable((observer: Observer<string>) => {
  this.observer = observer;
});
return this.observable;
}

//email OTP Verify
emailotpverify(emailotpobj){
  const emailotpurl = this._urlmanager.resolveUrl('L', 'PO','validateEmailOTP');
  const method = "POST";
  const body = emailotpobj;
  this._httpServiceObj.doHttpRequest(emailotpurl, method, body).subscribe(res => {
    this.observer.next(res);
    this.observer.complete();
},
err=> this.observer.error('Failed To Verify Email OTP'));
this.observable = new Observable((observer: Observer<string>) => {
  this.observer = observer;
});
return this.observable;
}
Newmobileverify(mobileverifyobj){
  const mobileverifyurl =this._urlmanager.resolveUrl('L','PO','emailverify');
  const method ='POST';
  const body = mobileverifyobj;
  this._httpServiceObj.doHttpRequest(mobileverifyurl,method,body).subscribe(res=>{
    this.observer.next(res);
    this.observer.complete();
  },
  err=> this.observer.error('Failed To Verify mobile OTP'));
  this.observable = new Observable((observer: Observer<string>) => {
    this.observer = observer;
  });
  return this.observable;
  }
  NewmobileotpVerify(mobileotpobj){
    const mobileverifyurl = this._urlmanager.resolveUrl('L','PO','validateEmailOTP');
    const method = 'POST';
    const body = mobileotpobj;
    this._httpServiceObj.doHttpRequest(mobileverifyurl, method ,body).subscribe(res =>{
this.observer.next(res);
this.observer.complete();
    },

    err=> this.observer.error('Failed To Verify mobile OTP'));
  this.observable = new Observable((observer: Observer<string>) => {
    this.observer = observer;
  });
  return this.observable;
  }

  expireToken() {
    this._httpServiceObj.expireToken();
  }
  navigateUrl(url: string) {
    const redirectUrl = {
      login: '/login',
      dashboard: '/panel/dashboard',
      dashboardcl: '/panel/dashboardclient'
    };
    if (url in redirectUrl) {
      console.log(url);
      this._router.navigateByUrl(redirectUrl[url]);
    } else {
      console.log('FAILED TO NAVIGATE URL (LOGINSERVICE) : ' + url);
    }
  }
}
