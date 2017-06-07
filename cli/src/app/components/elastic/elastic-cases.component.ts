import { Component,
         Input }               from '@angular/core';
import { MdDialog, 
         MdDialogRef,
         MdCardTitle }         from '@angular/material';
import { EditDialog }          from '../case/edit-dialog.component';
import { AgmDialog }           from '../case/agm-dialog.component';
import { CaseService }         from '../../services/case.service';    
import { Case }                from '../../model/case';
import { AgmMap, AgmMarker }   from '@agm/core';

@Component({
    selector: 'elastic-cases',
    templateUrl: '../../templates/elastic/elastic-cases.component.html',
    styleUrls:   ['../../style/elastic-cases.component.css']
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
    private   xy:                      number[]
    private   x:                       number
    private   y:                       number
    constructor(public editDialog:     MdDialog,
                public agmDialog:      MdDialog,
                private caseService:   CaseService){}

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
    
    getMap(coord: string): void {
        let agmDialogRef = this.agmDialog.open(AgmDialog, {
            data: {
                'x': this.getX(coord),
                'y': this.getY(coord),
            }
        })
    }

    getX(coord: string): number{
        this.xy = this.caseService.extractXY(coord)
        this.x = this.xy[0]
        console.log("extract x: ", this.x)
        return this.x
    }
    
    getY(coord: string): number{
        this.xy = this.caseService.extractXY(coord)
        this.y = this.xy[1]
        console.log("extract y:", this.y)
        return this.y
    }
    
}
