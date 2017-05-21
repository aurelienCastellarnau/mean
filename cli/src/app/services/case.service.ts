import { Injectable }                              from '@angular/core';
import { Case }                                    from '../model/case';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ErrorHandlerService }                     from '../services/error-handler.service';
import                         'rxjs/add/operator/toPromise';

@Injectable()
export class CaseService {
    constructor(private http: Http, private handleError: ErrorHandlerService) {}

    getCases(): Promise<Case[]> {
        const url = `/cases`;
        let cases:  Case[];

        console.log("[stacktrace-mean] call on CaseService: getCases()")
        return this.http.get(url, this.jwt())
            .toPromise()
            .then(response => response.json() as Case[])
            .catch(this.handleError.handlePromise)
    }

    getCase(param: string): Promise<Case> {
        const url = `/cases/${param}`;
        let c:      Case;

        console.log("[stacktrace-mean] call on CaseService: getCase() with param: ", param)
        return this.http.get(url, this.jwt())
            .toPromise()
            .then(response => response.json() as Case)
            .catch(this.handleError.handlePromise);
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
