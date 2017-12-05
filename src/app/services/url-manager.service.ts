import { Injectable } from '@angular/core';

@Injectable()
export class UrlManagerService {
  private urlSet: any;
  private loginSet: UrlSet;
  private registrationSet: UrlSet;
  private inventorySet: UrlSet;
  private productSet: UrlSet;
  private customerSet: UrlSet;
  // private userset: UrlSet;
  private apiserver;
  private apiserver2;
  private ssl;
  private UpdateProfileSet;

  constructor() {
    this.ssl = false;
    //Server1 APIS
    this.apiserver = 'ppgateway.filegstnow.com/happytohelp';
    this.apiserver = (this.ssl) ? 'https' : 'http' + '://' + this.apiserver;
    //Server2 APIS
    this.apiserver2 = 'http://ppepos.filegstnow.com/Pos/invoice/admin';
    this.apiserver2 = (this.ssl) ? 'https' : 'http' + '://' + this.apiserver2;
    //Initialization of URLs methods
    this.initializeLoginUrl();
    this.initializeRegistrationUrl();
    this.initializeInventoryUrl();
    this.initializeProductSetUrl();
    this.initializeCustomerSetUrl();
    this.initializeUserProfileUrl();

    this.urlSet = {
      login: this.loginSet,
      registeration: this.registrationSet,
      inventory: this.inventorySet,
      product: this.productSet,
      customer: this.customerSet,
      user: this.UpdateProfileSet
    }
  }
  private initializeLoginUrl() {
    this.loginSet = {
      get: {},
      post: {
        LoginAsClient: '/login',
        Login: '/online_billing/billing/loginClient',
        GenerateOtp: '/online_billing/billing/genrateOTP',
        verifyotp: '/online_billing/billing/validateforgetotp',
        changepassword: '/online_billing/billing/changepassword',
        resetpassword: '/online_billing/billing/reSetPassword',
        emailverify: '/online_billing/billing/genrateotpemailmobile',
        validateEmailOTP: '/online_billing/billing/validateOTP'
        // mobileverify:'online_billing/billing/genrateotpemailmobile',
        // validateMobileOTP:'/online_billing/billing/validateOTP'

      },
      put: {},
      delete: {}
    }
  }
  private initializeUserProfileUrl() {
    this.UpdateProfileSet = {
      get: {},
      post: {
        getprofile: '/online_billing/billing/getprofile',
        UpdateProfile: '/online_billing/billing/profileupdate',

      },
      put: {},
      delete: {}
    }
  }
  private initializeProductSetUrl() {
    this.productSet = {
      get: {},
      post: {
        viewAppointment: '/getappoint',
        modifyAppointment:'/aopoperation'
      },
      put: {},
      delete: {}
    }
  }
  private initializeCustomerSetUrl() {
    this.customerSet = {
      get: {},
      post: {
        // addCustomer: '/online_billing/billing/createClient',
        // viewcustomer: '/online_billing/billing/searchcreatedby',
        roleupdate: '/appointbook'
        // viewdistributorreseller: '/online_billing/billing/getuserlistdands'
      },
      put: {},
      delete: {}
    }
  }
  private initializeRegistrationUrl() {
    this.registrationSet = {
      get: {},
      post: {
        nameAvailability:'/validusr',
        Registration: '/volunteersave',
        RegistrationAsClient: '/clientsave'
      },
      put: {},
      delete: {}
    }
  }
  private initializeInventoryUrl() {
    this.inventorySet = {
      get: {},
      post: {
        Addinventory: '/addproduct',
        showInventory: '/getdproductlist'
      },
      put: {},
      delete: {}
    }
  }
  // TYPE : (L,R,I,P,C,U) , METHOD : (G,PO,PU,D) , NAME : array 
  public resolveUrl(type, method, indexName) {
    let error;
    error = (typeof type == undefined || type.trim() == "" ? '[ url Service ] TYPE is undefined ' : (typeof method == undefined || method.trim() == "" ? '[ url Service ] METHOD is undefined ' : (typeof indexName == undefined || indexName.trim() == "" ? '[ url Service ] INDEXNAME is undefined ' : 'pass')));
    if (error !== "pass") {
      return error;
    }


    return this.typeResolve(type, method, indexName);

  }
  private typeResolve(type, method, indexName) {
    switch (type) {
      case 'L': return this.methodResolve(this.urlSet.login, method, indexName);
      case 'R': return this.methodResolve(this.urlSet.registeration, method, indexName);
      case 'I': return this.methodResolve(this.urlSet.inventory, method, indexName);
      case 'P': return this.methodResolve(this.urlSet.product, method, indexName);
      case 'C': return this.methodResolve(this.urlSet.customer, method, indexName);
      case 'U': return this.methodResolve(this.urlSet.user, method, indexName);
      default:
        console.log('[ urlservice ]INVALID TYPE SUPPLIED ... ' + type);
        return 'Invalid Type ' + type;
    }
  }
  private methodResolve(urlObj, method, indexName) {
    switch (method) {
      case 'G': return this.indexNameResolve(urlObj.get, indexName);
      case 'PO': return this.indexNameResolve(urlObj.post, indexName);
      case 'PU': return this.indexNameResolve(urlObj.put, indexName);
      case 'D': return this.indexNameResolve(urlObj.delete, indexName);
      default:
        console.log('[ urlservice ]INVALID METHOD SUPPLIED ... ' + method);
        return 'Invalid Type ' + method;
    }
  }

  private indexNameResolve(urlObj, indexName) {
    if (urlObj[indexName] === 'showInventory' || urlObj[indexName] === 'Addinventory') {
      return (indexName in urlObj ? this.apiserver2 + urlObj[indexName] : ' NO SUCH URL DEFINED IN URL MANAGER ');
    }
    else {
      return (indexName in urlObj ? this.apiserver + urlObj[indexName] : ' NO SUCH URL DEFINED IN URL MANAGER ');
    }
    // return (indexName in urlObj ? urlObj[indexName] : ' NO SUCH URL DEFINED IN URL MANAGER ');
  }
}
interface UrlSet {
  get: Object;
  post: Object;
  put: Object;
  delete: Object;
}
