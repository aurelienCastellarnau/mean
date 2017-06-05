import { Injectable, OnInit }                      from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Agent }                                   from '../model/agent';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class AgentService {
    url = '/agents';

    constructor(
        private http: Http,
        private errorHandler: ErrorHandlerService,
    ) { }

    getAll() {
        console.log("[stacktrace-mean] call on Agentservice getAll()")
        return this.http.get(this.url, this.jwt())
                        .map((response: Response) => response.json())
    }


    getAdmin() {
        console.log("[stacktrace-mean] call on Agentservice getAll()")
        return this.http.get('/admin', this.jwt())
                        .map((response: Response) => response.json())
    }

    getById(param: string): Promise<Agent> {
        const url = `/agents/${param}`;
        let c:      Agent;

        console.log("[stacktrace-mean] call on CaseService: getCase() with param: ", param)
        return this.http.get(url, this.jwt())
            .toPromise()
            .then(response => response.json() as Agent)
            .catch(this.errorHandler.handlePromise);
    }

    getProperties(): Promise<String> {
        const url = '/agents/properties';
        const that = this;

        return this.http.get(url, this.jwt())
            .toPromise()
            .then(function(response){
                 console.log(response)
                 return response.json()
            })
            .catch(function(err){
                console.log(err)
                that.errorHandler.handlePromise(err)
            });
    }

    create(agent: Agent) {
        return this.http.post('/register', agent);
    }

    update(agent: Agent, __id: string) {
        return this.http.put(this.url + '/' + __id + '/edit', agent, this.jwt());
    }

    accept(__id: string) {
        return this.http.put('/admin/' + __id, __id,this.jwt());
    }

    delete(__id: string) {
        return this.http.delete(this.url + '/' + __id, this.jwt());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
