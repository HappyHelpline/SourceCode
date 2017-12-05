import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ApiManagerService } from './api-manager.service';
import { AlertService } from './alert.service';
import { UrlManagerService } from './url-manager.service';
import { DataStorageService } from './data-storage.service';

@Injectable()
export class UserprofileService {
  private observable: Observable<string>;
  private observer: Observer<string>;

  constructor(private _dataStorage: DataStorageService, private _httpServiceObj: ApiManagerService,private _router: Router, private _alertService: AlertService, private _urlmanager: UrlManagerService) { }
  
  //Get Profile
  getprofile(getprofileobj){
    const getprofileurl = this._urlmanager.resolveUrl('U', 'PO', 'getprofile');
    const method = "POST";
    const body =getprofileobj;
    this._httpServiceObj.doHttpRequest(getprofileurl, method, body).subscribe(res=>{
      this.observer.next(res);
      this.observer.complete();
    },
    err => this.observer.error('Failed To Get Profile'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }


//update Profile
newupdateProfile(updateprofileobj) {
  const updateprofileurl = this._urlmanager.resolveUrl('U', 'PO', 'UpdateProfile');  // DEMO 
  const method = "POST";
  const body = updateprofileobj;
  this._httpServiceObj.doHttpRequest(updateprofileurl, method, body).subscribe(res => {
    this.observer.next(res);
    this.observer.complete();
  },
  err => this.observer.error('Failed To Update Profile'));
this.observable = new Observable((observer: Observer<string>) => {
  this.observer = observer;
});
return this.observable;
}

navigateUrl(url: string) {
  const redirectUrl = {
    userProfile: '/panel/user'
  };
  if (url in redirectUrl) {
    this._router.navigateByUrl(redirectUrl[url]);
  } else {
    console.log('FAILED TO NAVIGATE URL (USERPROFILE SERVICE) : ' + url);
  }
}

}

