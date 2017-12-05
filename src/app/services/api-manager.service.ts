import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiManagerService {

  public httpRun: string;
  private methodtype: string;
  private url: string;
  private body: Object;
  private options: RequestOptions;
  private response: any;
  private authtoken: string;
  private observer: Observer<string>;

  constructor(private _httpObj: Http, private _authservice: AuthService) {
    this.httpRun = "HTTP Service is running oK";
  }

  doHttpRequest(url, method = "POST", body = {}, tokenInject = true): any {
    this.methodtype = method.toUpperCase();
    this.url = url;
    if (body) {
      if (tokenInject) {
        if (!this.injectToken(body)) {
          console.log('INVALID REQUEST : [ERROR] - FAILED TO SEND REQUEST');
          let observable = new Observable((observer: Observer<string>) => {
            this.observer = observer;
          });
          setTimeout(() => {
            this.observer.error('FAILED TO SEND REQUEST ERROR');
          }, 1000);
          return observable;
        }
        body = this.body
      }
      this.body = JSON.stringify(body);
    }
    this.response = this.internetGateway();
    if (this.response instanceof Observable) {
      return this.response;
    }
    else
      console.log("METHOD : " + this.methodtype + " url : " + this.url + " Response : " + this.response);
  }

  internetGateway(): any {
    let headers: Headers;
    switch (this.methodtype) {
      case 'GET':
        return this._httpObj.get(this.url, { withCredentials: true }).map(res => {
          let data = res.json();
          data = this.tokenKeeper(data);
          return data || {};
        }).catch(this.httpError);
      case 'POST':
        headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: headers, withCredentials: true });
        
        return this._httpObj.post(this.url, this.body, this.options).map(res => {
          let data = res.json();
          data = this.tokenKeeper(data);
          return data || {};
        }).catch(this.httpError);
      case 'DELETE':
        return this._httpObj.delete(this.url, { withCredentials: true }).map(res => {
          let data = res.json();
          data = this.tokenKeeper(data);
          return data || {};
        }).catch(this.httpError);
      case 'PUT':
        headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: headers, withCredentials: true });
        return this._httpObj.put(this.url, this.body, this.options).map(res => {
          let data = res.json();
          data = this.tokenKeeper(data);
          return data || {};
        }).catch(this.httpError);
      default:
        return "Invalid Method Request : 400 Method (" + this.methodtype + ") not allowed ";
    }
  }

  httpError(error: any) {
    return Observable.throw(error.json().error || 'Server error');
  }
  tokenKeeper(response) {
    if ('authtoken' in response && response.authtoken.trim() !== '') {
      this._authservice.store({ authtoken: response.authtoken });
      delete response.authtoken;
    }
    return response;
  }
  expireToken() {
    this._authservice.expireToken();
  }
  injectToken(body) {
    this.authtoken = this._authservice.retrieveToken();
    if (this.authtoken.trim() == '') {
      return false;
    }
    try {
      this.body = JSON.parse(body);
    }
    catch (e) {
      this.body = body;
    }
    console.log(this.authtoken);
    this.body['auth_token'] = this.authtoken;
    return true;
  }
}

