import { Component, Input, OnInit } from '@angular/core';
import { Case }                     from '../../model/case';
import { Router }                   from '@angular/router';
import { MeanMaterialModule }       from '../../mean-material.module';
import { CaseService }              from '../../services/case.service';
import { ErrorHandlerService }      from '../../services/error-handler.service';

@Component({
    selector:    'search-case',
    templateUrl: '../../templates/case/search-case.component.html',
    providers:   [CaseService, ErrorHandlerService],
})

export class SearchCaseComponent implements OnInit {
    public search:            string
    public searchedCases:     Case[]
    public searchedCase:      Case
    
    constructor(
        private caseService:  CaseService,
        private router:       Router,
        private errorHandler: ErrorHandlerService,
    ){}

    ngOnInit(): void {
        this.search = ''
        this.caseService.getCases()
            .then(cases => this.searchedCases = cases)
            .catch(this.errorHandler.handlePromise)
    }

    searchCase(): void {
        this.router.navigate(['/cases', this.search])
    }

    getCases(): void {
        this.caseService.getCases()
            .then(cases => this.searchedCases = cases)
            .catch(this.errorHandler.handlePromise)
    }
}
