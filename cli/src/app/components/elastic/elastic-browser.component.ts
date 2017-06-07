import { Component, 
         Input,
         OnInit,
         AfterViewInit }         from '@angular/core';
import { ElasticCasesComponent } from './elastic-cases.component';
import { Case }                  from '../../model/case';
import { CaseService }           from '../../services/case.service';
import { ElasticService }        from '../../services/elastic.service';
import { ToggleService }         from '../../services/toggle.service';
import { ErrorHandlerService }   from '../../services/error-handler.service';
import { AgmMap, AgmMarker }     from '@agm/core';

/*
** La stratégie utilisée est simple.
** Pour la fonctionnalité 'elastic Tools'
** ce component est le garant du modèle, des méthodes, et des variables
** il les fait ensuite redescendre vers ses deux enfants successifs
** <elastic-cases> => <case-edit>
*/
@Component({
    selector: 'elastic-browser',
    templateUrl: '../../templates/elastic/elastic-browser.component.html',
})
export class ElasticBrowserComponent implements OnInit, AfterViewInit{
    public   selectedCase:     Case
    public   properties:       String[]
    public   query:            String
    public   cases:            Case[]

    constructor(
        private elastic:       ElasticService,
        private caseService:   CaseService,
        private errorHandler:  ErrorHandlerService,
        private toggle:        ToggleService, 
        ){}
    
    search(): any {
        const that = this

        console.log(this.query)
        this.elastic.search(this.query)
        .then(function(results){
            that.cases = that.elastic.toCases(results)
            console.log(that.cases)
        })
        .catch(this.errorHandler.handlePromise)
    }

    ngOnInit(): void {
        const that = this

        this.toggle.toggleAwaiting(true)
        this.elastic.getCases()
        .then(cases => this.cases = cases)
        .catch(this.errorHandler.handlePromise)
        this.caseService.getProperties()
        .then(prop => this.properties = prop)
        .catch(this.errorHandler.handlePromise)
    }

    ngAfterViewInit(): void {
        this.toggle.toggleAwaiting(false)
    }
}