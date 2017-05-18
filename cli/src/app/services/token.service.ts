import { Injectable }             from '@angular/core';
import { Http }                   from '@angular/http';
import { ErrorHandlerService }    from '../services/error-handler.service';

@Injectable()
export class TokenService{
    constructor(private http: Http, private handleError: ErrorHandlerService) {}

    Login(agentCode: string, password: string): Promise<any> {

    }
}
