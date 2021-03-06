import { Component, 
         OnInit,
         Input }               from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params }              from '@angular/router';
import { Case }                from '../../model/case';
import { CaseService }         from '../../services/case.service';
import { AlertService }        from '../../services/alert.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Location }            from '@angular/common';

@Component({
    moduleId:    module.id,
    selector:    'case-edit',
    templateUrl: '../../templates/case/case-register.component.html',
})

export class EditCaseComponent implements OnInit {
    @Input() model:                   Case
    @Input() properties:              any

    public selectedProperties:        string[]
    public title =                    "Edit that case: "

    private sub:                      any
    private modelSave:                Case
    constructor(
        private router:               Router,
        private CaseService:          CaseService,
        private alertService:         AlertService,
        private location:             Location,
        private route:                ActivatedRoute,
        private errorHandler:         ErrorHandlerService,
    ){}

    register() {
        this.CaseService.update(this.model, this.modelSave)
            .subscribe(
            data => {
                this.alertService.success('Registration succesful', true)
                console.log(data)
            },
            error => {
                console.log("ERROR QUI CLAQUE")
                this.alertService.error(error._body)
            }
        )
    }

    selectProperties(p: string[], event) {
        event.preventDefault()
        this.selectedProperties = []
        p.sort((a, b) => (a > b) ? 1 : -1)
        p.forEach((prop, index, array) => this.selectedProperties.push(prop))
    }

    unselectProperties() {
        delete this.selectedProperties
    }

    goBack() {
        this.location.back()
    }

    ngOnInit() {
        this.properties = this.CaseService.getProperties()
    }

    private value: any = ['Athens']
    private _disabledV: string = '0'
    private disabled: boolean = false

    private get disabledV(): string {
        return this._disabledV
    }

    private set disabledV(value: string) {
        this._disabledV = value
        this.disabled = this._disabledV === '1'
    }

    public selected(value: any): void {
        console.log('Selected value is: ', value)
    }

    public removed(value: any): void {
        console.log('Removed value is: ', value)
    }

    public refreshValue(value: any): void {
        this.value = value;
    }
}
