import { Injectable }             from '@angular/core';
import { Http }                   from '@angular/http';
import { Agent }                  from '../model/agent';
import { ErrorHandlerService }    from '../services/error-handler.service';

@Injectable()
export class TokenService{
    constructor(private http: Http, private handleError: ErrorHandlerService) {}

    login(agentCode: number, password: string): Promise<Agent[]> {
        const url = '/identity';
        let agent: Agent[];

        console.log("[stacktrace-mean] call on TokenService: Login()]");
        return this.http.post(url, { agentCode, password })
                        .toPromise()
                        .then(response => response.json() as Agent[])
                        .catch(this.handleError.handlePromise)
    }

    logout(): void {
        const url = 'identity';
        console.log("[stacktrace-mean] call on TokenService: Lougout()]");
        this.http.delete(url)
    }
}
