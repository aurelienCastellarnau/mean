import {  Component, 
          OnInit,
          Input }                 from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Case }                   from '../../model/case';
import { CaseService }            from '../../services/case.service';
import { AlertService }           from '../../services/alert.service';
import { ErrorHandlerService }    from '../../services/error-handler.service';
import { Location }               from '@angular/common';

@Component({
    moduleId:    module.id,
    templateUrl: '../../templates/case/case-register.component.html',
})

export class CaseRegisterComponent implements OnInit {
    public model =             new Case()
    public properties:         any
    public selectedProperties: string[]
    public title =             "Register a new case: "

    constructor(
        private router:       Router,
        private route:        ActivatedRoute,
        private CaseService:  CaseService,
        private alertService: AlertService,
        private location:     Location,
        private errorHandler: ErrorHandlerService,
    ){}

    register() {
        this.CaseService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Registration succesful', true)
                this.router.navigate(['/cases/'])
            },
            error => {
                console.log("ERROR QUI CLAQUE")
                this.alertService.error(error._body)
            })
    }

    selectProperties(p: any, event) {
        event.preventDefault()
        this.selectedProperties = []
        p.sort((a, b) => (a > b) ? 1 : -1)
        p.forEach(element => this.selectedProperties.push(element));
    }

   prevent(event) {
        event.preventDefault()
    }
    
    ngOnInit() {
        const that = this;
        this.properties = this.route.snapshot.data['properties']
        console.log("this.properties: ", this.properties)
    }

    goBack() {
        this.location.back()
    }
}
