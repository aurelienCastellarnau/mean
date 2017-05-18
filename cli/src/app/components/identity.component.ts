import { Component, OnInit }    from '@angular/core';
import { Agent }                from '../model/agent';
import { TokenService }         from '../services/token.service'
import { ErrorHandlerService }  from '../services/error-handler.service';

@Component({
    selector:     'identity',
    templateUrl:  '../templates/identity.component.html',
    providers:    [TokenService, ErrorHandlerService]
})

export class IdentityComponent {
    agent: Agent[];
    constructor(
        private TokenService: TokenService,
        private errorHandler: ErrorHandlerService
        ){}

    login(): void {
        this.TokenService.login(123, "oto")
            .then(agent => this.agent = agent)
            .catch(this.errorHandler.handlePromise)
    }

}
