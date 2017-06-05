import { Component, 
         Input,
         OnInit }               from '@angular/core';
import { ElasticCasesComponent} from './elastic-cases.component';
import { Case }                 from '../../model/case';
import { CaseService }          from '../../services/case.service';
import { ElasticService }       from '../../services/elastic.service';
import { ErrorHandlerService }  from '../../services/error-handler.service';

@Component({
    selector: 'elastic-browser',
    templateUrl: '../../templates/elastic/elastic-browser.component.html',
})
export class ElasticBrowserComponent implements OnInit{
    public   selectedCase:    Case
    public   properties:      String[]
    public   query:           String
    public   cases:           Case[]

    constructor(
        private elastic:      ElasticService,
        private caseService:  CaseService,
        private errorHandler: ErrorHandlerService,
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
        this.elastic.getCases()
        .then(cases => this.cases = cases)
        .catch(this.errorHandler.handlePromise)
        this.caseService.getProperties()
        .then(prop => this.properties = prop)
        .catch(this.errorHandler.handlePromise)
    }
}