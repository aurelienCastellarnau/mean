import { Component, 
         Inject,
         Input }               from '@angular/core';
/*
** En l'état le router n'est pas appellé! 
*/
import { Router, 
         ActivatedRoute, 
         Params }              from '@angular/router';
import { MdDialog, 
         MdDialogRef,
         MD_DIALOG_DATA }      from '@angular/material';
import { Case }                from '../../model/case';
import { CaseService }         from '../../services/case.service';
import { AlertService }        from '../../services/alert.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Location }            from '@angular/common';

@Component({
    selector: "edit-dialog-component",
    templateUrl: '../../templates/case/case-register.component.html',
})
export class EditDialog {
    public selectedProperties = []
    public model:                                  Case
    public properties = []
    public title =                                 "Edit that case: "

    private sub:                                   any
    private modelSave:                             Case
    constructor(
        public dialogRef:                          MdDialogRef<EditDialog>,
        @Inject(MD_DIALOG_DATA) public data:       any,
        private router:                            Router,
        private CaseService:                       CaseService,
        private alertService:                      AlertService,
        private location:                          Location,
        private route:                             ActivatedRoute,
        private errorHandler:                      ErrorHandlerService,
        ){
            this.properties = this.data.properties
            this.model = this.data.model
            this.modelSave = this.data.modelSave
        }

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
        p.forEach(element => this.selectedProperties.push(element));
    }

    /*
    ** Pas utilisé pour l'instant,
    ** this.selectedProperties devient 'undefined'

    unselectProperties() {
        delete this.selectedProperties
    }

    **
    */
    
    goBack() {
        this.location.back()
    }

    /*
    ** Possible implémentation d'options
    ** dans les inputs `TypeHead`
    ** 
    ** 

    private value: any = ""
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

    **
    **
    */
}