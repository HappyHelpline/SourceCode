import { Component, OnInit } from '@angular/core';
import { ViewemiComponent } from './viewemi/viewemi.component';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const PRODUCTROUTES: RouteInfo[] = [
  { path: 'productmaster', title: 'Product Master', icon: 'pe-7s-graph', class: '' },
  { path: 'addproduct', title: 'Add Product', icon: 'pe-7s-graph', class: '' },
  { path: 'plan', title: 'Product Plan', icon: 'pe-7s-map-marker', class: '' },
  { path: 'appointment', title: 'View Appointment', icon: 'pe-7s-map-marker', class: '' },
  { path: 'licensesys', title: 'Generate License', icon: 'pe-7s-map-marker', class: '' }
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
