import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../../../../services/userprofile.service';
import { AlertService } from '../../../../services/alert.service';
import { LoginService } from '../../../../services/login.service';
import { DataStorageService } from '../../../../services/data-storage.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserprofileService]
})
export class UserComponent implements OnInit {
  private firstname: string;
  private lname: string;
  private username: string;
  private password: string;
  private email: string;
  private mobile: number;
  private state: string;
  private address: any;
  private pan: any;
  private pincode: any;
  public loading: boolean;
  private response: any;
  constructor(private _userprofileservice: UserprofileService, private _dataStorage: DataStorageService, private _loginServiceobj: LoginService, private _alertService: AlertService) { }

  ngOnInit() {
    this.loading = true;
    // const profile: any = this._loginServiceobj.profileData;
    // this.email = profile.email;
    // this.mobile = profile.mobile_no;
    // this.pan = profile.pan;
    // this.firstname = profile.name;
    let getprofileobj = {
    };
    this._userprofileservice.getprofile(getprofileobj).subscribe(res => {
      this.response = res;
      this.loading = false;
      console.log(this.response);
      if (parseInt(this.response.status) === 1) {
        this._alertService.success('Data fetched successfully', true);
        this.firstname = this.response.fisrtName;//data receive from login
        this.lname = this.response.lastName;
        this.mobile = this.response.mobile;
        this.username = this.response.username;
        this.email = this.response.email;
        this.address = this.response.address;
        this.state = this.response.state;
        this.pincode = this.response.pincode;
        this.pan = this.response.pan;


        //  this. _dataStorage.saveData(res);
      }
      else {
        this._alertService.error(this.response.msg, true);
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

  updateProfile() {
    this.loading = true;
    const updateprofileobj = {
      role: "role",
      username: this.username,
      fisrtName: this.firstname,
      lastName: this.lname,
      address: this.address,
      state: this.state,
      pincode: this.pincode,
      mobile: this.mobile,
      pan: this.pan,
      email: this.email
    };
    console.log(updateprofileobj)
    this._userprofileservice.newupdateProfile(updateprofileobj).subscribe(res => {
      this.loading = false;
      this.response = res;
      if (parseInt(this.response.status) === 1) {
        this._alertService.success('Profile Successfully Updated');
         this._userprofileservice.navigateUrl('userProfile');
      }
      else {
        this._alertService.error(this.response.msg);
      }
    },
      (error) => {
        this.loading = false;
        this._alertService.error('NETWORK ERROR');
        console.log('PROFILE UPDATE REQUEST ERROR :', error);
      },
      () => {
        // console.log('PRODUCT TYPE REQUEST COMPLETED');
      }
    );
  }
}