import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from  '../header/header.component';
import { FooterComponent } from  '../footer/footer.component';
import { LoginService } from '../../services/login.service';
import { AlertService } from '../../services/alert.service';
@Component({
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public type:string;
  public confirmed:boolean;
  public passwd:any;
  public email:string;
  public loginname:string;
  public loading:boolean;
  private response: any;
  public password:any;
  public otp:any;
  public newpwd:any;
  public confirmpwd:any;
  
  firstStepPassword = true;
  secondStepPassword = false;
  thirdStepPassword = false;
  thankumessage = false;
  
  constructor(private _loginservice: LoginService,private _alertService: AlertService) { }

  ngOnInit() {
    this.loading = false;
this.confirmed = true;
  }
  firstStepPasswordFunc(){
    this.loading = true;
    this.loginname = this.loginname;
    let forgetpasswordobj= {
      email:this.email,
      loginname:this.loginname,
      "type":"forgetpassword"
     }
   console.log(forgetpasswordobj);
    this._loginservice.generateotp(forgetpasswordobj).subscribe(res => {
      this.loading = false;
      this.response = res;
      if (parseInt(this.response.status) === 1) {
        this.firstStepPassword = !this.firstStepPassword;
        this.secondStepPassword = !this.secondStepPassword;
        this._alertService.success('Username/Email Submit Successfully');
      } else {
        this._alertService.error(this.response.msg);
      }
     },
     (error) => {
      this.loading = false;
      this._alertService.error('NETWORK ERROR');
      console.log('FORGET PASSWORD REQUEST ERROR :',error);
     },
     ()=>{
      // console.log('PRODUCT TYPE REQUEST COMPLETED');
     }
    );
    
  }
  secondStepPasswordFunc(){
    this.loading = true;
    this.loginname=this.loginname
    console.log(this.loginname)
    let otpobj= {
     loginname:this.loginname,
     otp:this.otp,
     }
     console.log(otpobj);
     this._loginservice.verifyotp(otpobj).subscribe(res=>{
       this.loading=false;
       this.response= res;
       if (parseInt(this.response.status) === 1) {
        this.secondStepPassword = !this.secondStepPassword;
        this.thirdStepPassword = !this.thirdStepPassword;
        this._alertService.success('OTP Submit Successfully');
      } else {
        this._alertService.error(this.response.msg);
      }
     },
     (error) => {
      this.loading = false;
      this._alertService.error('NETWORK ERROR');
      console.log('FORGET PASSWORD REQUEST ERROR :',error);
     },
     ()=>{
      // console.log('PRODUCT TYPE REQUEST COMPLETED');
     }
    );
  }
  newPassFunc(newpaswd){
      this.passwd = newpaswd;
  }

  confirmpasswordFunc(confirmobj)
  {
    if(this.passwd===confirmobj){
      this.confirmed = true;
    }
    else{
      this._alertService.error("Password isn't matching");
      this.confirmed = false;
    }
}  
thirdStepPasswordFunc(){
  this.loginname = this.loginname;
  if(this.confirmed){
   this.loading = true;
  let changepwdobj= {
    loginname:this.loginname,
    password:this.newpwd,
    }
  console.log(changepwdobj)
  this._loginservice.changepwd(changepwdobj).subscribe(res=>{
    this.loading=false;
    this.response= res;
    if (parseInt(this.response.status) === 1) {
     this._alertService.success('New Password Created Successfully');
     this.thankumessage=true;
     this.thirdStepPassword = false;

   } else {
     this._alertService.error(this.response.msg);
   }
  },
  (error) => {
   this.loading = false;
   this._alertService.error('NETWORK ERROR');
   console.log('FORGET PASSWORD REQUEST ERROR :',error);
  },
  ()=>{
   // console.log('PRODUCT TYPE REQUEST COMPLETED');
  }
 );
  }
  else{
    this._alertService.error("Your password and confirm password is not matching")
  }
    
  }
  

}
