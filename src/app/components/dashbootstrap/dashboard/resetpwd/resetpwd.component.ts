import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { AlertService } from '../../../../services/alert.service';
@Component({
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {

  public loading: boolean;
  private response: any;
  public newpassword: any;
  public oldpassword: any;
  public passwd: any;
  public confirmed;

  public thankumessages = false;
  public resetPassword = true;

  constructor(private _loginservice: LoginService, private _alertService: AlertService) { }

  ngOnInit() {
    this.loading = false;
    this.confirmed = true;
  }

  newPassFunc(newpaswd) {
    this.passwd = newpaswd;
  }

  confirmpasswordFunc(confirmobj) {
    if (this.passwd === confirmobj) {
      this.confirmed = true;
      this._alertService.success("password matched")
    }
    else {
      this._alertService.error("Password isn't matching");
      this.confirmed = false;
    }
  }
  
  resetPasswordFunc() {
    if (this.confirmed) {
      const resetpwdobj = {
        password: this.newpassword,
        oldpassword: this.oldpassword,
       }
      this._loginservice.resetpwd(resetpwdobj).subscribe(res => {
        this.loading = false;
        this.response = res;
        if (parseInt(this.response.status) === 1) {
          this._alertService.success('Password is Reset Sucessfully', true);
          this.thankumessages = true;
          this.resetPassword = false;

        }
        else {
          this._alertService.error(this.response.msg);
        }
      },
        (error) => {
          this.loading = false;
          this._alertService.error('NETWORK ERROR');
          console.log('RESET PASSWORD REQUEST ERROR :', error);
        },
        () => {
          // console.log('Reset PASSWORD REQUEST COMPLETED');
        }


      );

    }
    else {
      this._alertService.error('Your password and confirm password is not matching');
    }

  }
}

