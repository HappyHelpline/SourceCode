import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ApiManagerService } from './api-manager.service';
import { AlertService } from './alert.service';
import { UrlManagerService } from './url-manager.service';
import { DataStorageService } from './data-storage.service';

@Injectable()
export class InventoryService {
  public response;
  public error;
  private observable: Observable<string>;
  private observer: Observer<string>;

  constructor(private _dataStorage: DataStorageService, private _httpServiceObj: ApiManagerService, private _router: Router, private _alertService: AlertService, private _urlmanager: UrlManagerService) {

  }

  addNewProduct(addProductbody) {
    const addProducturl = this._urlmanager.resolveUrl('I', 'PO', 'Addinventory');  // DEMO 
    const method = "POST";
    const body = addProductbody;
    this._httpServiceObj.doHttpRequest(addProducturl, method, body, false).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Submit Data'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  /**Show Inventory */
  showProduct(showProductbody) {
    const showProducturl = this._urlmanager.resolveUrl('I', 'PO', 'showInventory');  // DEMO 
    const method = "POST";
    const body = showProductbody;
    this._httpServiceObj.doHttpRequest(showProducturl, method, body, false).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    }, err => this.observer.error('Failed To Fetch Data'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  navigateUrl(url: string) {
    const redirectUrl = {
      //login : '/login',
      inventory: '/panel/inventory'
    };
    if (url in redirectUrl) {
      this._router.navigateByUrl(redirectUrl[url]);
    } else {
      console.log('FAILED TO NAVIGATE URL (LOGINSERVICE) : ' + url);
    }
  }

}
