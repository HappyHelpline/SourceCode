import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  completed: any;
  pending: any;
  approved: any;
  appointment: string;

  constructor() {
    this.appointment = sessionStorage.getItem('appointment');
    this.approved = JSON.parse(this.appointment).approved;
    this.pending =JSON.parse(this.appointment).pending;
    this.completed =JSON.parse(this.appointment).completed;

    console.log(this.appointment);
   }

  ngOnInit() {

  };


}
