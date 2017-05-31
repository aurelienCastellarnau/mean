import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CaseService } from '../services/case.service';
import { AlertService } from '../services/alert.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: '../templates/case-register.component.html'
})

export class EditCaseComponent implements OnInit {
    public model: any = {};
    public properties: any;
    private sub: any;
    private id: string;
    constructor(
        private router: Router,
        private CaseService: CaseService,
        private alertService: AlertService,
        private location: Location,
        private route: ActivatedRoute,
        private errorHandler: ErrorHandlerService,
    ) { }

    register() {
        console.log(this.id);
        this.CaseService.update(this.model, this.id)
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
    goBack() {
        this.location.back()
    }

    ngOnInit(): void {
        let that = this

        console.log("[stack-trace] calling on ngOnInit with param: ", this.route.params)
        this.properties = this.route.snapshot.data['properties'];
        console.log("this.properties: ", this.properties)
        /*
        this.CaseService.getProperties()
            .then(function (properties) {
                console.log("[mean] Call on getProperties() from cases-edit component: ", properties)
                that.properties.naturecode = properties.naturecode
                console.log("that.properties: ", that.properties)
            })
            .catch(this.errorHandler.handlePromise)
            */
        this.route.params
            .switchMap((params: Params) => this.CaseService.getCase(params['param']))
            .subscribe(function (c) {
                console.log("suscribing:", c)
                that.model = c
                console.log(that.model)
            })

        this.sub = this.route.params.subscribe(params => {
            this.id = params['param'];
        })

    }
    private value: any = ['Athens'];
    private _disabledV: string = '0';
    private disabled: boolean = false;

    private get disabledV(): string {
        return this._disabledV;
    }

    private set disabledV(value: string) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

    public removed(value: any): void {
        console.log('Removed value is: ', value);
    }

    public refreshValue(value: any): void {
        this.value = value;
    }
}
