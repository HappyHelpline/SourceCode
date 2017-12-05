import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStorageService } from '../../../../../services/data-storage.service';
import { ProductService } from '../../../../../services/product.service';
import { AlertService } from '../../../../../services/alert.service';
@Component({
  selector: 'app-viewemi',
  templateUrl: './viewemi.component.html',
  styleUrls: ['./viewemi.component.scss']
})
export class ViewemiComponent implements OnInit {
  public viewEMiArray: any;
  public loading: boolean;
  private response: any;
  private data;
  public PlanList;
  ProductList = [];
  emiList = [];
  rows = [];
  private typeOfplan: string;
  public productid: number;
  statusTypeArray = [];
  public statusType;
  public statusTypeToSend;
  public appointmentData: any;
  DataOfAppointment = [];
  public clientData;
  public volunteerObj;
  constructor(private _ProductService: ProductService, private _dataStorage: DataStorageService, private _alertService: AlertService) {

  }
  ngOnInit() {
    // this.loading = false;
    // // this.loading = true;
    this.statusTypeArray = [
      { type: "Pending" },
      { type: "Approved" },
      { type: "Complete" },
      { type: "Reject" }
    ]

    this.clientData = JSON.parse(sessionStorage.getItem('clientObj'));
    this.volunteerObj = JSON.parse(sessionStorage.getItem('volunteerObj'));
    console.log(this.volunteerObj);
    this.showInitData()
    //this.initData();
  }
  showInitData() {
    this.loading = true;
    let objOfModified = {
      volunteer_id: this.volunteerObj.volunteer_id
    }
    this._ProductService.viewData(objOfModified).subscribe(res => {
      this.loading = false;
      this.response = res;
      console.log(this.response);
      if (parseInt(this.response.status) === 1) {
        this._alertService.success("Data has been fetched successfully");
      }
      else if (parseInt(this.response.status) === 0) {
        this._alertService.error(this.response.msg);
      }
      else {
        this._alertService.error("Error while fetching data");
      }
    }, err => {
      this.loading = false;
      this._alertService.error("Network Error");
    });
  }
  viewAppointmentData() {
    if (this.response.hasOwnProperty('Reject') || this.response.hasOwnProperty('Complete') || this.response.hasOwnProperty('Approved') || this.response.hasOwnProperty('Pending')) {
      if (this.statusType === "Reject") {
        if (this.response.Reject.length > 0) {
          this.DataOfAppointment = this.response.Reject;
        }
        else {
          this._alertService.error("No appointment in rejected list")
        }
      }
      else if (this.statusType === "Complete") {
        if (this.response.Complete.length > 0) {
          this.DataOfAppointment = this.response.Complete;
        }
        else {
          this._alertService.error("No appointment in Completed list")
        }
      }
      else if (this.statusType === "Approved") {
        if (this.response.Approved.length > 0) {
          this.DataOfAppointment = this.response.Approved;
        }
        else {
          this._alertService.error("No appointment in Approved list")
        }
      }
      else if (this.statusType === "Pending") {
        if (this.response.Pending.length > 0) {
          this.DataOfAppointment = this.response.Pending;
        }
        else {
          this._alertService.error("No appointment in Pending list")
        }
      }
    }
    else {
      this._alertService.error("No record found");
    }
  }
  volunteerFunc(Obj, Status) {
    this.loading = true;
    let ModifyAppointmentObj = {
      "appoint_id": Obj.appoint_id,
      "status": Status
    }
    // 
    this._ProductService.ModifyAppoinment(ModifyAppointmentObj).subscribe(data => {
      this.data = data
      this.loading = false;
      if (parseInt(this.data.status) == 1) {
        console.log(this.data);
        this._alertService.success("Updated Successfully");
        location.reload();
        //this.showInitData();
      }
      else {
        this._alertService.error("Issue In updation");
      }
    }, err => {
      this.loading = false;
      this._alertService.error("Netwrok Error");
    });


  }
}
