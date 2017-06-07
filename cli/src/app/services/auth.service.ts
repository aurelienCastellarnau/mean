import { Injectable }              from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }              from 'rxjs/Observable';
import { ErrorHandlerService }     from '../services/error-handler.service';
import { ToggleService }           from '../services/toggle.service';
import                             'rxjs/add/operator/map';
import { Agent }                   from '../model/agent';

@Injectable()
export class AuthenticationService{
    private agent :          Agent
    constructor(
        private http:        Http, 
        private handleError: ErrorHandlerService,
        private toggle:      ToggleService
    ){}

    login(agentCode: number, password: string) {
        const url = '/identity'
        const that = this

        console.log("[stacktrace-mean] call on TokenService: Login()]");
        return this.http.post(url, { agentCode: agentCode, password: password })
                        .map((response: Response) => {
                            this.agent = response.json() as Agent
                            console.log(this.agent)
                            if (this.agent && this.agent.token) {
                                localStorage.setItem('currentUser', JSON.stringify(this.agent))
                                that.toggle.toggleUser(this.agent)
                            }
                        })
    }

    logout() {
        localStorage.removeItem('currentUser')
    }
}
