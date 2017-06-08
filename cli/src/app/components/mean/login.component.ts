import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Agent }                  from '../../model/agent';
import { AuthenticationService }  from '../../services/auth.service';
import { ToggleService }          from '../../services/toggle.service';

@Component({
    moduleId:    module.id,
    templateUrl: '../../templates/mean/login.component.html'
})

export class LoginComponent implements OnInit {
    model:                               any = {}
    loading =                            false
    returnUrl:                           string

    constructor(
        private route:                   ActivatedRoute,
        private router:                  Router,
        private authentificationService: AuthenticationService,
        private toggle:                  ToggleService
    ){}

    ngOnInit() {
        this.authentificationService.logout()
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
    }

    login() {
        const that = this

        this.loading = true;
        this.authentificationService
            .login(this.model.agentcode, this.model.password)
            .subscribe( data => {
                that.router.navigate([this.returnUrl])
            },
            error => {
                this.loading = false
            }
        )
    }
}
