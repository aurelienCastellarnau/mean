import { Component,
         Input }       from '@angular/core';
import { MdDialog, 
         MdDialogRef } from '@angular/material';
import { EditDialog }  from '../case/edit-dialog.component';      
import { Case }        from '../../model/case';

@Component({
    selector: 'elastic-cases',
    templateUrl: '../../templates/elastic/elastic-cases.component.html',
})

export class ElasticCasesComponent {
    /*
    ** le @Input nous permet de lié la variable
    ** à un component parent et de la transmettre
    ** lors de l'appel du template 
    ** (voir elastic-browser.component.html et l'appel de <elastic-cases>)
    */
    @Input() cases:                    Case[]
    @Input() properties:               String[]
    public   selectedCase:             Case

    private  modelSave:                Case
    constructor(public editDialog: MdDialog){}

    selectCase(c: Case): void {
        this.selectedCase = Object.assign({}, c)
        this.modelSave = Object.assign({}, c)
        console.log("original:", c, " selected: ", this.selectedCase, " modelSave: ", this.modelSave)
        let editDialogRef = this.editDialog.open(EditDialog, {
            height: '500px',
            width: '700px',
            data: {
                'model': this.selectedCase,
                'modelSave': this.modelSave,
                'properties': this.properties
            }
        })
    }
}
