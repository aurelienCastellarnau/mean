import { Injectable }              from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { ErrorHandlerService }     from '../services/error-handler.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    constructor(private http: Http, private handleError: ErrorHandlerService) { }

    login(agentCode: number, password: string) {
        const url = '/identity';

        console.log("[stacktrace-mean] call on TokenService: Login()]");
        return this.http.post(url, { agentCode: agentCode, password: password })
                        .map((response: Response) => {
                            let agent = response.json();
                            if (agent && agent.token) {
                                localStorage.setItem('currentUser', JSON.stringify(agent));
                            }
                        })
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
