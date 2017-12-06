import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { AlertService } from '../../services/alert.service';
import { RegistrationService } from '../../services/registration.service';
@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  public typeOfUser;
  typeOfUserArray = [];
  public registration;
  public registerAs: boolean; //Flag
  public gender_type;

  public first_name;
  public last_name;
  public contact_no;
  public alternate_no;
  public email_add;
  public address;
  public state;
  public country;
  public professional;
  public about_you;
  public language;
  public whyjoinus;
  public schedule_time;
  public username;
  public password;

  public loading: boolean;
  private response: any;
  public firstname: string;
  public lastname: string;

  private pincode: string;
  private pan: string;
  private email: string;
  private mobile: string;
  public Username;
  public Password;
 
  constructor(private _registrationService: RegistrationService, private _dataStorage: DataStorageService, private _alertService: AlertService) { }

  ngOnInit() {
    
    this.registerAs = true;
    this.loading = false;
    this.gender_type = "Male";
    this.registration = "volunteer";
    this.typeOfUserArray = [{ type: "client" },
    { type: "volunteer" }]
  }
  typeofUserFunc(typeOfUserObj) {
    if (typeOfUserObj === "client") {
      this.registration = "client";
    }
    else {
      this.registration = "volunteer";
      //this.registration = "thanks";
      //this.registerAs = false;
    }

  }
  radioButtonClick(geVal) {
    console.log(this.gender_type);
  }
  checkName(UserNameData) {
    this.loading = true;
    let usernameobj = {
      username: UserNameData
    }
   
    this._registrationService.checkNameAvailability(usernameobj).subscribe(
      res => {
        this.loading = false;
        this.response = res;
        
        if (parseInt(this.response.status) === 1) {
          this._alertService.success(this.response.msg, true);
         
        }
        else {
          
          this._alertService.error(this.response.msg, true);
        
        }
      }, err => {

        this.loading = false;
        this._alertService.error("Network error");
        
      });
  }
  volunteerFunc() {
  

    this.loading = true;
    let volunteerObj = {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "gender_type": this.gender_type,
      "contact_no": this.contact_no,
      "alternate_no": this.alternate_no,
      "email_add": this.email_add,
      "address": this.address,
      "state": this.state,
      "country": this.country,
      "professional": this.professional,
      "about_you": this.about_you,
      "language": this.language,
      "whyjoinus": this.whyjoinus,
      "schedule_time": this.schedule_time
    }
    
    this._registrationService.doRegisterAsVolunteer(volunteerObj).subscribe(res => {
      this.loading = false;
      this.response = res;
      
      if (parseInt(this.response.status) == 1) {
        this._alertService.success(this.response.msg, true);
        this.registration = "thanks";
        this.registerAs = false;
        this.Username = this.response.username;
        this.Password = this.response.password;
        
      }
      else {
        this._alertService.error(this.response.msg, true);
      }
    },
      (error) => {
        this.loading = false;
        this._alertService.error("Network error", true);
      });
  }
  registerAsClientfunc() {
    
    this.loading = true;
    let clientObj = {
      "username": this.username,
      "password": this.password,
      "contact_no": this.contact_no,
      "email_add": this.email_add
    }
    this._registrationService.doRegisterAsClient(clientObj).subscribe(res => {
      this.loading = false;
      this.response = res;
      
      if (parseInt(this.response.status) == 1) {
        this._alertService.success(this.response.msg, true);
        this._registrationService.navigateUrlofRegister('login');
      }
      else {
        this._alertService.error(this.response.msg, true);
      }
    },
      (error) => {
        this.loading = false;
        this._alertService.error("Network error", true);
      }
    );
  }



}


