import { Injectable }          from '@angular/core';
import { Case }                from '../model/case';
import { Http, 
         Headers, 
         RequestOptions, 
         Response }            from '@angular/http';
import { ErrorHandlerService } from '../services/error-handler.service';
import                         'rxjs/add/operator/toPromise';

@Injectable()
export class ElasticService {
    public case: Case
    public cases: Case[]

    constructor(
        private http: Http,
        private handleError: ErrorHandlerService,
    ){}

    getCases(): Promise<Case[]> {
        const url = '/elasticsearch'
        const that = this

        return this.http.get(url, this.jwt())
            .toPromise()
            .then(function (response) {
                let hits = response.json()
                that.cases = []
                hits.hits.hits.forEach(element => {
                    //element._source._id = element._source.uuid
                    console.log(element)
                    that.cases.push(element._source as Case)
                });
                console.log("cases: ", that.cases)
                return that.cases
            })
            .catch(this.handleError.handlePromise)
    }

    getCase(param: string): Promise<Case>{
        const url = `/elasticsearch/${param}`
        const that = this

        return this.http.get(url, this.jwt())
        .toPromise()
        .then(response => this.case = response.json() as Case)
        .catch(this.handleError.handlePromise)
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))

        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token })
            return new RequestOptions({ headers: headers })
        }
    }
}
