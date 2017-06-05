import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService }  from '../../services/auth.service';

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
        private authentificationService: AuthenticationService
    ){}

    ngOnInit() {
        this.authentificationService.logout()
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
    }

    login() {
        this.loading = true;
        this.authentificationService
            .login(this.model.agentcode, this.model.password)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl])
            },
            error => {
                this.loading = false
            }
        )
    }
}
