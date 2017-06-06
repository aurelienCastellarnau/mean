import { Component, Input } from '@angular/core';
import { Case }             from '../../model/Case';

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
    @Input() cases:        Case[]
    @Input() properties:   String[]
    public   selectedCase: Case

    selectCase(c: Case): void {
        this.selectedCase = c
        console.log(this.selectedCase)
    }
}}
