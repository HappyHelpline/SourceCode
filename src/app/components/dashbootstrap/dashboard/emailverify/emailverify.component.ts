import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.scss'],
  providers: [LoginService]
})
export class EmailverifyComponent implements OnInit {
  public loading: boolean;
  public type: string;
  public email:string;
  public response:any;
  public otp:string;

  public emailverify =true; //flag
  public emailOtpVerify = false;
  public thankumessages = false;
  constructor( private _loginServiceobj: LoginService, private _alertService: AlertService) { }

  ngOnInit() {
    this.loading = false;
  }
  emailVerifyFunc(){
    this.loading = true;
    const emailverifyobj ={
      "type" :"type",
      email:this.email
 }
 this._loginServiceobj.newemailverify(emailverifyobj).subscribe(res =>{
   this.loading = false;
   this.response = res;
   if(parseInt(this.response.status) === 1){
    this.emailverify=false;
    this.emailOtpVerify=true;
     this._alertService.success('Email Send successfully',true );
    
   }
   else{
     this._alertService.error(this.response.msg);
   }
  },
   (error) => {
    this.loading = false;
    this._alertService.error('NETWORK ERROR');
    console.error('CUSTOMER REQUEST ERROR :', error);
  },
  () => {
    // console.log('PRODUCT MASTER REQUEST COMPLETED');
  }
);

  }

  emailotpVerifyFunc(){
    this.loading= true;
    const emailotpobj= {
      otp:this.otp,
      "type": "type",
    }
    this._loginServiceobj.emailotpverify(emailotpobj).subscribe(res =>{
      this.loading = false;
      this.response = res;
      if(parseInt(this.response.status) === 1){
        this._alertService.success('OTP Submit successfully',true );
        this.thankumessages=true;
        this.emailOtpVerify = false;
       
      }
      else{
        this._alertService.error(this.response.msg);
      }
     },
      (error) => {
       this.loading = false;
       this._alertService.error('NETWORK ERROR');
       console.error('CUSTOMER REQUEST ERROR :', error);
     },
     () => {
       // console.log('PRODUCT MASTER REQUEST COMPLETED');
     }
   );
   
     }


}


