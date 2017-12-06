import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../../../../services/userprofile.service';
import { AlertService } from '../../../../services/alert.service';
import { LoginService } from '../../../../services/login.service';
import { DataStorageService } from '../../../../services/data-storage.service';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserprofileService]
})
export class UserComponent implements OnInit {
  friends: { name: string; }[];
  private profiledetail;
  private fname;
  private lname;
  private gender;
  private mobile;
  private email;
  private profession;
  private sch_tym;


  constructor(private _userprofileservice: UserprofileService, private _dataStorage: DataStorageService, private _loginServiceobj: LoginService, private _alertService: AlertService) {

    this.profiledetail = JSON.parse(sessionStorage.getItem('volunteerObj'));
    this.fname = this.profiledetail.first_name;
    this.lname = this.profiledetail.last_name;
    this.sch_tym = this.profiledetail.schedule_time;
    this.mobile = this.profiledetail.contact_no;
    this.email = this.profiledetail.email_add;
    this.profession = this.profiledetail.about_you;

   this.friends = [
      {name:'Lucky'},
      {name:'Yoga'},
      {name:'Fauzan'},
      {name:'Cecep'},
      {name:'Nurjaman'},
      {name:'Asti'},
    ];
    


    console.log(this.profiledetail);
  }

  ngOnInit() {

//     $('.selected-items-box').bind('click', function(e) {
//       $('.wrapper .list').slideToggle('fast');
//   });

//   this.getSelectedItems = function(item){
//     // alert();
//      return item.selected;
//  };

  }


}