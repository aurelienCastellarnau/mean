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
            .then(response => response.json())
            .catch(this.handleError.handlePromise)
    }

    getCase(param: String): Promise<Case>{
        const url = `/elasticsearch/${param}`
        const that = this

        return this.http.get(url, this.jwt())
        .toPromise()
        .then(response => response.json() as Case)
        .catch(this.handleError.handlePromise)
    }

    /*
    ** De ce côté ca marche comme ailleurs...
    */
    search(param: String): Promise<any>{
        const url = `/elasticsearch/${param}`
        const that = this

        return this.http.get(url, this.jwt())
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError.handlePromise)
    }

    /*
    ** particularité de la réponse fournie par elastic search.
    ** les objets sont dans response.hits.hits[
    **                                        0 => [
    **                                            _source: case
    **                                        ]
    **                                        1 => [
    **                                            _source: case
    **                                        ]
    **                                        etc...
    **                                  ]
    ** d'où cette méthode de parsing.
    */
    toCases(elasticObject: any): Case[]{
        let cases = []

        elasticObject.hits.hits.forEach(hit => {
            cases.push(hit._source)
        })
        console.log(cases)
        return cases
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))

        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token })
            return new RequestOptions({ headers: headers })
        }
    }
}
