import { Injectable }          from '@angular/core';
import { Case }                from '../model/case';
import { Http }                from '@angular/http';
import { ErrorHandlerService } from '../services/error-handler.service';
import                         'rxjs/add/operator/toPromise';

@Injectable()
export class CaseService {
    constructor(private http: Http, private handleError: ErrorHandlerService) {}

    getCases(): Promise<Case[][]> {
        const url = `/cases`;
        let cases:  Case[][];

        console.log("[stacktrace-mean] call on CaseService: getCases()")
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Case[][])
            .catch(this.handleError.handlePromise)
    }

    getCase(param: string): Promise<Case> {
        const url = `/cases/${param}`;
        let c:      Case;

        console.log("[stacktrace-mean] call on CaseService: getCase() with param: ", param)
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Case)
            .catch(this.handleError.handlePromise);
    }
}
