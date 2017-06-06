import { Component,
         OnInit }              from '@angular/core';
import { Case }                from '../../model/Case';
import { MeanMaterialModule }  from '../../mean-material.module';
import { CaseDetailComponent } from './case-detail.component';
import { CaseService }         from '../../services/case.service';
import { ElasticService }      from '../../services/elastic.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';

@Component({
    selector:    'cases',
    templateUrl: '../../templates/case/cases.component.html',
    providers:   [CaseService, ErrorHandlerService, ElasticService],
})

export class CasesComponent implements OnInit {
    public    cases:             Case[]
    public    properties:        Array<String>
    public    selectedCase:      Case

    public p: number = 1;
    lat: number = 42.28598136;
  lng: number = -71.14732954;


    constructor(
        private CaseService:  CaseService,
        private errorHandler: ErrorHandlerService,
        private elastic:      ElasticService,
    ){}

    getCases(): void {
        this.CaseService.getCases()
            .then(cases => {this.cases = cases; console.log(cases[0].location.split(/([\d.-]{11,12})[^()]/))})
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
                console.log("[mean] getProperties(): ", properties)
                that.properties = properties
            })
            .catch(this.errorHandler.handlePromise)
    }

    selectCase(c: Case): any {
        this.selectedCase = c
        console.log(this.selectedCase)
    }

    ngOnInit(): void {
        this.getProperties()
        this.getCases()
    }
}
