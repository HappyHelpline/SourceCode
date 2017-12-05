import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { ApiManagerService } from './api-manager.service';
import { AlertService } from './alert.service';
import { UrlManagerService } from './url-manager.service';
import { Router } from '@angular/router';

@Injectable()
export class CustomerService {
  private observable: Observable<string>;
  private observer: Observer<string>;

  constructor(private _dataStorage: DataStorageService, private _httpServiceObj: ApiManagerService, 
    private _router: Router,
    private _alertService: AlertService, private _urlmanager: UrlManagerService) {
  }

  //httpService
  httpService(url, method, body){
    this._httpServiceObj.doHttpRequest(url, method, body, false).subscribe(res => {
      console.log(res);
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error("Failed to upgrade data"));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    }
    );
    return this.observable;
  }
  addNewCustomer(addCustomerbody) {
    const addcustomerurl = this._urlmanager.resolveUrl('C', 'PO', 'addCustomer');
    const method = 'POST';
    const body = addCustomerbody;
    this._httpServiceObj.doHttpRequest(addcustomerurl, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Submit Login'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }

  viewCustomer(viewCustomerObj) {
    const viewcustomerurl = this._urlmanager.resolveUrl('C', 'PO', 'viewcustomer');
    const method = 'POST';
    const body = viewCustomerObj;
    this._httpServiceObj.doHttpRequest(viewcustomerurl, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Fetch Data'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  // 2017-11-27 10:10:10
  newupgradeRole(roleObjUpgarde) {
    const url = this._urlmanager.resolveUrl('C', 'PO', 'roleupdate');
    const method = 'POST';
    const body = roleObjUpgarde;
   return this.httpService(url, method, body);
  }

  newdistributorreseller(distributorresellerobj) {
    const distributorresellerurl = this._urlmanager.resolveUrl('C', 'PO', 'viewdistributorreseller');
    const method = 'POST';
    const body = distributorresellerobj;
    this._httpServiceObj.doHttpRequest(distributorresellerurl, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error("Failed to view Distributor/Reseller data"));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    }
    );
    return this.observable;
  }

  navigateUrl(url: string) {
    const redirectUrl = {
      noNavigate: '/true',
    };
    if (url in redirectUrl) {
      this._router.navigateByUrl(redirectUrl[url]);
    } else {
      console.log('FAILED TO NAVIGATE URL (CUSTOMER SERVICE) : ' + url);
    }
  }
}
