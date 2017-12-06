import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashclient',
  templateUrl: './dashclient.component.html',
  styleUrls: ['./dashclient.component.scss']
})
export class DashclientComponent implements OnInit {

  private appointment;
  private appointments;

  constructor() {
    this.appointment = sessionStorage.getItem('appointment');
    this.appointments = JSON.parse(this.appointment).all_data;
  }

  ngOnInit() {
  }

}
