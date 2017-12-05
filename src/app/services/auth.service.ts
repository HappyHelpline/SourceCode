import { Injectable } from '@angular/core';

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
]

const eject = (arr, index) => arr.slice(index, 1)

@Injectable()
export class AuthService {
  public authToken: string;
  public tok_key: string;
  public placevalues: string;
  public placekeeper: string;

  constructor() {
    this.authToken = '';
    this.tok_key = 'billy';
    this.placekeeper = 'dummy';
    this.placevalues = '55555';
  }

  isLoggedIn() {
    this.refreshToken();
    if (this.authToken.trim() !== '') {
      return true;
    }
    return false;
  }

  public retrieveToken() {
    this.minglezingle('retrieve');
    this.refreshToken();
    return this.authToken;
  }

  private refreshToken() {
    if (this.authToken.trim() == '') {
      try {
        this.authToken = this.retrieve();
      }
      catch (ex) {
        console.log(ex);
      }
      finally {
        console.log('TOKEN REFRESHED');
      }
    } else {
      try {
        console.log(this.retrieve());
      }
      catch (ex) {
        console.log(ex);
        this.store({ authtoken: this.authToken });
        console.log('DELETED TOKEN RECOVERD');
      }
    }
  }

  public store(content) {
    this.authToken = content.authtoken;
    console.log('ORIGINAL ', this.authToken);
    localStorage.setItem(this.tok_key, this.minglezingle('store'));
  }

  private retrieve() {
    let storedToken: string = localStorage.getItem(this.tok_key);
    if (!storedToken) throw 'no token found';
    return storedToken;
  }

  private minglezingle(mode) {
    switch (mode) {
      case 'store':
        this.placevalues = this.randomizer.genRandPlaceValues5().toString();
        this.placekeeper = this.randomizer.genRandString5();
        return this.processor();

      case 'retrieve':
        this.validator();
        break;
      default: console.log('AUTH INVALID MODE SUPPLIED');
    }
  }
  private processor() {
    // console.log(this.placevalues, this.placekeeper , this.authToken);
    let tempAuthToken = this.authToken.split('');
    for (var i = 0, len = this.placevalues.length; i < len; i += 1) {
      tempAuthToken = insert(tempAuthToken, parseInt(this.placevalues.charAt(i)), this.placekeeper.charAt(i));
    }
    return tempAuthToken.join('');
  }
  private validator() {
    let original = this.processor();
    let local = 'empty';
    try {
      local = this.retrieve();
    }
    catch (ex) {
      console.log(ex);
    }
    if (local == original) {
      console.log('security okkkkkkkkkkkk');
    }
    else {
      console.log('security impacted. ...DANGER', local, original);
      this.expireToken();
    }

  }
  private randomizer = {
    genRandPlaceValues5: function () {
      return Math.floor(Math.random() * 89999 + 10000);
    },
    genRandString5: function (length = 5) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
  }
  public expireToken() {
    this.authToken = '';
    this.placekeeper = 'dummy';
    this.placevalues = '55555';
    localStorage.clear();

  }
}
