import {  Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaseService } from '../services/case.service';
import { AlertService } from '../services/alert.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: '../templates/case-register.component.html'
})

export class RegisterCaseComponent implements OnInit {
    model: any = {};    
    public properties: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private CaseService: CaseService,
        private alertService: AlertService,
        private location: Location,
        private errorHandler: ErrorHandlerService,
    ) { }

    register() {
        this.CaseService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration succesful', true);
                this.router.navigate(['/cases/']);
            },
            error => {
                console.log("ERROR QUI CLAQUE");
                this.alertService.error(error._body);
            })
    }

    ngOnInit() {
        const that = this;
        this.properties = this.route.snapshot.data['properties'];
        console.log("this.properties: ", this.properties)
        /*
        this.CaseService.getProperties()
            .then(function (properties) {
                console.log("[mean] call on getProperties() from case-register.component: ", properties)
                that.properties = properties
                console.log("[mean] that.properties: ", that.properties)
            })
            .catch(this.errorHandler.handlePromise)
            */
    }

    goBack() {
        this.location.back()
    }
}
