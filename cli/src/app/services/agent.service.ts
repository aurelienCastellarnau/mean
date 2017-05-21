import { Injectable }                              from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Agent }                                   from '../model/agent';

@Injectable()
export class AgentService {
    constructor(
        private http: Http,
        private url: "/agents/"
    ) { }

    getAll() {
        console.log("[stacktrace-mean] call on Agentservice getAll()")
        return this.http.get(this.url, this.jwt())
                        .map((response: Response) => response.json());
    }

    getById(__id: string) {
        console.log("[stacktrace-mean] call on Agentservice getById() with id: ", __id);
        return this.http.get(this.url + __id, this.jwt())
                        .map((response: Response) => response.json());
    }

    create(agent: Agent) {
        return this.http.post(this.url + 'register', agent, this.jwt());
    }

    update(agent: Agent, __id: string) {
        return this.http.put(this.url + __id + '/edit', agent, this.jwt());
    }

    delete(__id: string) {
        return this.http.delete(this.url + __id, this.jwt());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
