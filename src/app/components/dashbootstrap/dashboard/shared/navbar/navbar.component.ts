import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AlertService } from '../../../../../services/alert.service';
import { LoginService } from '../../../../../services/login.service';

import { ROUTES } from '../../sidebar/sidebar.component';

import { PRODUCTROUTES } from '../../viewAppointment/product.component';
import { CUSTOMERROUTES } from './../../takeAppointment/view.component';



@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location, private element: ElementRef,
        private _alertService: AlertService,
        private _loginServiceobj: LoginService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = [...ROUTES.filter(listTitle => listTitle),
        
        ...PRODUCTROUTES.filter(listTitle => listTitle),
        ...CUSTOMERROUTES.filter(listTitle => listTitle)
        ];
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.split('/').pop();
        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    LogOut() {
        //sessionStorage.removeItem('userType');
        sessionStorage.clear();
        this._alertService.success('Logout Successfully', true);
        this._loginServiceobj.expireToken();
        this._loginServiceobj.navigateUrl('login');

    }
}
