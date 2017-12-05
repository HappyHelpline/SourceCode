import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { ApiManagerService } from './api-manager.service';
import { UrlManagerService } from './url-manager.service';
import { AlertService } from './alert.service';

@Injectable()
export class RegistrationService {
  public error;
  public response;
  private observable: Observable<string>;
  private observer: Observer<string>;
  constructor(private _httpServiceObj: ApiManagerService, private __alertService: AlertService, private _router: Router, private _urlmanager: UrlManagerService) { }


  httpService(url, method, body) {
    this._httpServiceObj.doHttpRequest(url, method, body, false).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Submit Login'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }

  //check availability
  checkNameAvailability(usernameobj){
    const Url = this._urlmanager.resolveUrl('R', 'PO', 'nameAvailability');
    const method = "POST";
    const body = usernameobj;
   
    return this.httpService(Url, method, body);
  }

  //Register Service
  doRegisterAsVolunteer(registerObj) {
    const Url = this._urlmanager.resolveUrl('R', 'PO', 'Registration');
    const method = "POST";
    const body = registerObj;
    return this.httpService(Url, method, body);
  }
  doRegisterAsClient(registerObj) {
    const Url = this._urlmanager.resolveUrl('R', 'PO', 'RegistrationAsClient');
    const method = "POST";
    const body = registerObj;
    return this.httpService(Url, method, body);
  }
  navigateUrlofRegister(url:string){
    const redirectUrl = {
      login : '/login',
      //dashboard : '/panel/dashboard'
    };
    if(url in redirectUrl){
      this._router.navigateByUrl(redirectUrl[url]);
    }else{
      console.log('FAILED TO NAVIGATE URL (LOGINSERVICE) : '+url);
    }
  }
}
