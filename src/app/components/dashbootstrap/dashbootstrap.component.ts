import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

import { HomeComponent } from './dashboard/home/home.component';
import { UserComponent } from './dashboard/user/user.component';
import { FooterComponent } from '../footer/footer.component';

// RESET PASSWORD
import { ResetpwdComponent } from './dashboard/resetpwd/resetpwd.component';
import { DataStorageService } from '../../services/data-storage.service';


@Component({
  templateUrl: './dashbootstrap.component.html',
  styleUrls: ['./dashbootstrap.component.scss']
})
export class DashbootstrapComponent implements OnInit {

  constructor(public location: Location , private _dataStorage: DataStorageService) { }

  ngOnInit() {
  }

  isMap(path){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    if(path == titlee){
      return false;
    }
    else {
      return true;
    }
  }
}
