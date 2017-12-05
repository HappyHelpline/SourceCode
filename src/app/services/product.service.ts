import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ApiManagerService } from './api-manager.service';
import { AlertService } from './alert.service';
import { UrlManagerService } from './url-manager.service';
import { DataStorageService } from './data-storage.service';
@Injectable()
export class ProductService {
  private observable: Observable<string>;
  private observer: Observer<string>;

  constructor(private _dataStorage: DataStorageService, private _httpServiceObj: ApiManagerService, private _router: Router, private _alertService: AlertService, private _urlmanager: UrlManagerService) {
  }
  //hhtpservice
httpService(url, method, body){
  this._httpServiceObj.doHttpRequest(url, method, body, false).subscribe(res => {
    this.observer.next(res);
    this.observer.complete();
  },
    err => this.observer.error('Failed To View Plan'));
  this.observable = new Observable((observer: Observer<string>) => {
    this.observer = observer;
  });
  return this.observable;
}

ModifyAppoinment(appointmentObj){
  const url = this._urlmanager.resolveUrl('P', 'PO', 'modifyAppointment');  // DEMO 
  const method = "POST";
  const body = appointmentObj;
return this.httpService(url, method, body);
}
  //Get element Type like as earning and expense
 
  // 
 
  //
  
  //View Approved Data
  viewData(viewplansobj) {
    const url = this._urlmanager.resolveUrl('P', 'PO', 'viewAppointment');  // DEMO 
    const method = "POST";
    const body = viewplansobj;
  return this.httpService(url, method, body);
  }
  //Add new Product
  addNewProduct(addProductbody) {
    const addProducturl = this._urlmanager.resolveUrl('P', 'PO', 'addProduct');  // DEMO 
    const method = "POST";
    const body = addProductbody;
    this._httpServiceObj.doHttpRequest(addProducturl, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    },
      err => this.observer.error('Failed To Add New Product'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  //Product Master 2
  addProductMaster(addProductMasterObj) {
    const productelementurl = this._urlmanager.resolveUrl('P', 'PO', 'productelement');  // DEMO 
    const method = "POST";
    const body = addProductMasterObj;
    this._httpServiceObj.doHttpRequest(productelementurl, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    },
      err => this.observer.error('Failed To Add New plan type'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;

  }
  //Product Plan
  SubmitproductPlan(planObj) {
    const addProducturl = this._urlmanager.resolveUrl('P', 'PO', 'planProduct');  // DEMO 
    const method = "POST";
    const body = planObj;
    this._httpServiceObj.doHttpRequest(addProducturl, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    },
      err => this.observer.error('Failed To Submit Product Plan'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  //show EMI Plan
  viewEmiPlanreturns(emiplanObj) {
    const emiPlan = this._urlmanager.resolveUrl('P', 'PO', 'emiPlan');  // DEMO 
    const method = "POST";
    const body = emiplanObj;
    this._httpServiceObj.doHttpRequest(emiPlan, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    },
      err => this.observer.error('Failed To View EMI Plans'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  //Add Product type

  addNewProductType(addProducttypeObj) {
    const addProductType = this._urlmanager.resolveUrl('P', 'PO', 'addProductType');  // DEMO 
    const method = "POST";
    const body = addProducttypeObj;
    this._httpServiceObj.doHttpRequest(addProductType, method, body).subscribe(res => {
      this.observer.next(res);
      this.observer.complete();
    },
      err => this.observer.error('Failed To add Product Type'));
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });
    return this.observable;
  }
  //

  navigateUrl(url: string) {
    const redirectUrl = {
      noNavigate: '/true'
      // Login:'/login'
    };
    if (url in redirectUrl) {
      this._router.navigateByUrl(redirectUrl[url]);
    } else {
      console.log('FAILED TO NAVIGATE URL (PRODUCT SERVICE) : ' + url);
    }
  }
}
