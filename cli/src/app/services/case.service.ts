import { Injectable }          from '@angular/core';
import { Case }                from '../model/case';
import { Http, 
         Headers, 
         RequestOptions, 
         Response }            from '@angular/http';
import { ErrorHandlerService } from '../services/error-handler.service';
import                         'rxjs/add/operator/toPromise';

@Injectable()
export class CaseService {
    constructor(private http: Http, private handleError: ErrorHandlerService){}

    getCases(): Promise<Case[]> {
        const url = `/cases`
        let cases: Case[]

        console.log("[stacktrace-mean] call on CaseService: getCases()")
        return this.http.get(url, this.jwt())
            .toPromise()
            .then(response => response.json() as Case[])
            .catch(this.handleError.handlePromise)
    }

    getCasesElastic(): Promise<any> {
        const url = '/elasticsearch'

        return this.http.get(url, this.jwt())
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError.handlePromise)
    }

    getCase(param: string): Promise<Case> {
        const that = this
        const url = `/cases/${param}`

        console.log("[stacktrace-mean] call on CaseService: getCase() with param: ", param)
        return this.http.get(url, this.jwt())
            .toPromise()
            .then(response => response.json() as Case)
            .catch(that.handleError.handlePromise)
    }

    create(Case: Case) {
        return this.http.post('/cases/create', Case, this.jwt())
    }

    update(Case: Case, __id: string) {
        const url = '/cases'
        
        return this.http.put(url + '/' + __id + '/edit', Case, this.jwt())
    }

    delete(__id: string) {
        const url = '/cases'

        return this.http.delete(url + '/' + __id, this.jwt())
    }

    getProperties(): Promise<String[]> {
        const url = '/cases/properties'
        const that = this

        return this.http.get(url, this.jwt())
            .toPromise()
            .then(function(response){
                 console.log(response)
                 return response.json() as String[]  
            })
            .catch(function(err){
                console.log(err)
                that.handleError.handlePromise(err)
            });
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))

        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token })
            return new RequestOptions({ headers: headers })
        }
    }
}
