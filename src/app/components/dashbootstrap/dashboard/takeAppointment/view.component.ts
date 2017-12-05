import { Component, OnInit } from '@angular/core';
import { ViewcustomerComponent } from './viewcustomer/viewcustomer.component';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const CUSTOMERROUTES: RouteInfo[] = [
 
  { path: 'addcustomer', title: 'Add Customer', icon: 'pe-7s-graph', class: '' }
];
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
