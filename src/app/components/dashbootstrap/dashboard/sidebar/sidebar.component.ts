import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    rolesRequired: any;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '', rolesRequired: ['volunteer'] },
    { path: 'viewappointment', title: 'View Appointment', icon: 'pe-7s-cart', class: '', rolesRequired: ['volunteer'] },
    { path:'dashboardclient', title:'Dashboard', icon: 'pe-7s-graph', class: '', rolesRequired: ['client']},
    { path: 'takeappointment', title: 'Take Appointment', icon: 'pe-7s-user', class: '', rolesRequired: ['client'] },
    { path: 'resetpwd', title: 'Reset Password', icon: 'pe-7s-key', class: '', rolesRequired: ['admin'] }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    menuList: any;
    selected: any;
    public roleType;
    //arrSelected:any[];

    constructor(private authService: AuthService) {
    }
    ngOnInit() {
        this.menuItems = this.getMenu();
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    getMenu() {
        this.roleType = sessionStorage.getItem('userType');
        //console.log(this.roleType);
        const arrSelected = [];
        for (let i = 0; i < ROUTES.length; i++) {
            console.log(ROUTES[i].rolesRequired[i]);
            for (let j = 0; j < ROUTES[i].rolesRequired.length; j++) {
                if (ROUTES[i].rolesRequired[j] == this.roleType) {
                    arrSelected.push(ROUTES[i]);
                }
            }
        }
        return arrSelected;
    };

}