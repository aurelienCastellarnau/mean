import { Injectable } from '@angular/core';
import { Case } from '../model/case';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/*
** Angular2 fonctionne sur le principe des services:
** C'est de cette façon qu'on définira: 
** - les contacts à l'api,
** - les éventuels parsing
** - la gestion de l'authentification
** 
** Ici c'est un GET /cases
*/
@Injectable()
export class CaseService {
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        /*
        ** gestion basique des erreurs, on affichera
        ** une erreur propre dans le client en temps voulu.
        */
        console.error('An error occurred: ', error);
        return Promise.reject(error.message || error)
    }

    /*
    ** on désynchronise l'appel en construisant
    ** la fonction de manière à renvoyer une promise.
    ** dans search.component.ts on utilisera:
    ** getCases().then(cases => this.cases = cases)
    */
    getCases(): Promise<Case[]> {
        const url = `/cases`;
        let cases: Case[];

        console.log("[stacktrace-mean] call on CaseService: getCases()")
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Case[])
            .catch(this.handleError)
    }

    getCase(param: string): Promise<Case> {
        let c: Case;
        const url = `/cases/${param}`;

        console.log("[stacktrace-mean] call on CaseService: getCase() with param: ", param)
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Case)
            .catch(this.handleError);
    }

}