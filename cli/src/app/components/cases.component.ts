import { Component, OnInit }   from '@angular/core';
import { Case }                from '../model/Case';
import { MeanMaterialModule }  from '../mean-material.module';
import { CaseService }         from '../services/case.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
    selector:    'cases',
    templateUrl: '../templates/cases.component.html',
    providers:   [CaseService, ErrorHandlerService]
})
export class CasesComponent implements OnInit {
    cases:                    Case[];
    constructor(
        private CaseService:  CaseService,
        private errorHandler: ErrorHandlerService,
    ){}

    getCases(): void {
        this.CaseService.getCases()
            .then(cases => this.cases = cases)
            .catch(this.errorHandler.handlePromise)
    }

    ngOnInit(): void {
        this.getCases()
    }

}
