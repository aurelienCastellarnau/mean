import { Component, 
         OnInit }              from '@angular/core';
import { Case }                from '../../model/Case';
import { MeanMaterialModule }  from '../../mean-material.module';
import { CaseDetailComponent } from './case-detail.component';
import { CaseService }         from '../../services/case.service';
import { ElasticService }      from '../../services/elastic.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
    selector:    'cases',
    templateUrl: '../../templates/case/cases.component.html',
    providers:   [CaseService, ErrorHandlerService, ElasticService],
})

export class CasesComponent implements OnInit {
    public    cases:             Case[]
    public    properties:        Array<String>
    public    selectedCase:      Case

    private   modelSave:         Case
    constructor(
        private CaseService:  CaseService,
        private errorHandler: ErrorHandlerService,
        private elastic:      ElasticService,
    ){}

    getCases(): void {
        this.CaseService.getCases()
            .then(cases => this.cases = cases)
            .catch(this.errorHandler.handlePromise)
    }

    getCasesElastic(): void {
        const that = this
        this.cases = []
        this.elastic.getCases()
            .then(function (c) {
                console.log("elastic all:" , c)
                that.cases = c
            })
            .catch(this.errorHandler.handlePromise)
    }

    getProperties(): void {
        const that = this;

        this.CaseService.getProperties()
            .then(function (properties) {
                that.properties = properties
            })
            .catch(this.errorHandler.handlePromise)
    }

    selectCase(c: Case): any {
        this.selectedCase = Object.assign({}, c)
        this.modelSave =  Object.assign({}, c)
    }

    ngOnInit(): void {
        this.getProperties()
        this.getCases()
    }
}
