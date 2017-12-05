// Imports all libraries,services,models,classes
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

// declare var $: any;
import * as $ from 'jquery';
@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: './alert.component.html',  //template refrence
    styleUrls: ['./alert.component.css']  //css refrence
})

export class AlertComponent implements OnInit {
    //variables declartion
    message: any = "";
    Success: any;
    showerror: boolean = false;
    showsuccess: boolean = false;

    //constructor for  dependency injection
    constructor(private alertService: AlertService) { }

    //method to initialize first
    ngOnInit() {
        //call the alert service to display a message on success and on error
        this.alertService.getMessage().subscribe(message => {
            this.message = message;
            if (this.message != null) {
                $('.alert-msg-error').hide();
                $('.alert-msg').hide();
                this.setHide();
                if (this.message.type === "success") {
                    this.showsuccess = true
                    $('.alert-msg-error').hide();
                    $('.alert-msg').show();
                    this.setHide();
                }
                if (this.message.type === "error") {
                    this.setHide();
                    this.showerror = true;
                    $('.alert-msg-error').show();
                    this.setHide();
                }
            };
        })
    }

    setHide() {
        //method to hide the message popup
        setTimeout(function () {
            $('.alert-msg').hide();
            $('.alert-msg-error').hide();
        }, 2500);
    }
}
