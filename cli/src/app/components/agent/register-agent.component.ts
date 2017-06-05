import { Component }    from '@angular/core';
import { Router }       from '@angular/router';
import { AgentService } from '../../services/agent.service';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/agent/register-agent.component.html',
})

export class RegisterComponent {
    public model: any = {}
    public loading = false

    constructor(
        private router: Router,
        private userService: AgentService,
    ){}

    register() {
        this.loading = true
        this.userService.create(this.model)
            .subscribe(data => {
                this.router.navigate(['/login'])
            },
            error => {
                this.loading = false
            })
    }
}
