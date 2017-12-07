import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
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

  public firstname: string;
  public lastname: string;

  private pincode: string;
  private pan: string;
  private email: string;
  private mobile: string;
  public Username;
  public Password;

  public optionsModel;
  public loading: boolean;
  private response: any;
  model: number[];
  myOptions = [];
  availTime = [];
  myJsonString: string;

  constructor(private _registrationService: RegistrationService, private _dataStorage: DataStorageService, private _alertService: AlertService) { }

  ngOnInit() {
    this.registerAs = true;
    this.loading = false;
    this.gender_type = "Male";
    this.registration = "volunteer";
    this.typeOfUserArray = [{ type: "client" },
    { type: "volunteer" }];

    this.myOptions = [
      { id: 0, elementname: '7 am to 8 am' },
      { id: 1, elementname: '8 am to 9 am' },
      { id: 2, elementname: '9 am to 10 am' },
      { id: 3, elementname: '10 am to 11 am' },
      { id: 4, elementname: '11 am to 12 pm' },
      { id: 5, elementname: '12 pm to 1 pm' },
      { id: 6, elementname: '1 pm to 2 pm' },
      { id: 7, elementname: '2 pm to 3 pm' },
      { id: 8, elementname: '3 pm to 4 pm' },
      { id: 9, elementname: '4 pm to 5 pm' },
      { id: 10, elementname: '5 pm to 6 pm' },
      { id: 11, elementname: '6 pm to 7 pm' },
      { id: 12, elementname: '7 pm to 8 pm' },
      { id: 13, elementname: '8 pm to 9 pm' },
      { id: 14, elementname: '9 pm to 10 pm' },
      { id: 15, elementname: '10 pm to 11 pm' },
      { id: 16, elementname: '11 pm to 12 am' },
      { id: 17, elementname: '12 am to 1 am' },
      { id: 18, elementname: '1 am to 2 am' },
      { id: 19, elementname: '2 am to 3 am' },
      { id: 20, elementname: '3 am to 4 am' },
      { id: 21, elementname: '4 am to 5 am' },
      { id: 22, elementname: '5 am to 6 am' },
      { id: 23, elementname: '6 am to 7 am' }
    ];

  }

  onChange(obj) {
   this.availTime = [];
    obj.forEach(id => {
        this.availTime.push(this.myOptions[id].elementname);
        this.myJsonString = JSON.stringify(this.availTime);
    });
    console.log(this.myJsonString);
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
    //console.log(this.availTime);

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
      "schedule_time": this.myJsonString
    }
    console.log(volunteerObj);
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


