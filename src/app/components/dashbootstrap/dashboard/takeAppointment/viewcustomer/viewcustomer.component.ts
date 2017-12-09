import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Observable } from 'rxjs';
import { CustomerService } from '../../../../../services/customer.service';
import { DataStorageService } from '../../../../../services/data-storage.service';
import { AlertService } from '../../../../../services/alert.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.scss']
})
export class ViewcustomerComponent implements OnInit {
  schedule_time: any;
  schedule_times: any;
  customerobj = [];
  dataOfcustomer = [];
  rows = [];
  categoryName = [];
  selected = [];
  temp = [];
  statesList: any;
  public optionsModel: any;
  public loading: boolean;
  private response: any;
  public closeResult: string;
  public email;
  public fisrtName;
  public id;
  public Roleid;
  public address;
  public mobile;
  public gender_type;
  public professional;
  public customertypesArray;
  public clientData;
  volunteerObj: any;
  public volunteerId;
  public description;
  public date;

  //@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _CustomerService: CustomerService, private __modalService: NgbModal, private _dataStorage: DataStorageService, private _alertService: AlertService) {
  }
  ngOnInit() {
    this.loading = false;
    this.optionsModel = [];
    this.clientData = JSON.parse(sessionStorage.getItem('clientObj'));
    this.volunteerObj = JSON.parse(sessionStorage.getItem('volunteerObj'));

    this.volunteerObj.forEach((volunter, index) => {
      this.optionsModel[index] = 'Select Appointment Time';
      let schedule_time = ['Select Appointment Time'];
      JSON.parse(volunter.schedule_time).forEach((time, index) => {
        schedule_time.push(time);
      });
      this.volunteerObj[index].schedule_time = schedule_time;
    });
  }

  onChange(obj) {

  }
  // MODAL OPEN FUNC
  upgradeRole(containers, volunteerlistObj, index) {
    console.log(volunteerlistObj);
    this.volunteerId = volunteerlistObj.volunteer_id;
    this.email = volunteerlistObj.email_add;
    this.fisrtName = volunteerlistObj.first_name;
    this.id = volunteerlistObj.id;
    this.address = volunteerlistObj.address;
    this.mobile = volunteerlistObj.contact_no;
    this.gender_type = volunteerlistObj.gender_type;
    this.professional = volunteerlistObj.professional;
    this.schedule_time = this.optionsModel[index];
    this.date = volunteerlistObj.myDate.toString();
    this.__modalService.open(containers).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   
  }
  //Upgrade function
  Upgrade(close) {
    this.loading = true;
    let roleObjUpgarde = {
      volunteer_id: this.volunteerId,
      client_id: this.clientData.username,
      sechdule_date: this.schedule_time,
      date: this.date,
      description: this.description
    }
    console.log(roleObjUpgarde);
    this._CustomerService.newupgradeRole(roleObjUpgarde).subscribe(res => {
      this.loading = false;
      this.response = res;

      if (parseInt(this.response.status) === 1) {
        this._alertService.success("Appointment has been sent successfully", true);
        //this._dataStorage.saveData(this.customerobj);

      }
      else {
        this._alertService.error(this.response.msg, true);

      }
    },
      (error) => {
        this.loading = false;
        this._alertService.error('NETWORK ERROR');

      },
      () => {

      }
    );


    this.getDismissReason(close);
    // return true;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {

      return `with: ${reason}`;
    }
  }

  //FILTER EVENT TO FILTER DATA
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.categoryid.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }
}
