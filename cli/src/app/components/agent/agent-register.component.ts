import { Component }     from '@angular/core';
import { Router }        from '@angular/router';
import { AgentService }  from '../../services/agent.service';
import { AlertService }  from '../../services/alert.service';
import { Location }      from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/agent/agent-register.component.html',
})

export class RegisterAgentComponent {
    public model: any = {}

    constructor(
        private router: Router,
        private AgentService: AgentService,
        private alertService: AlertService,
        private location: Location,
    ){}

    register() {
        this.AgentService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration succesful', true)
                    this.router.navigate(['/agents/'])
                },
                error => {
                    console.log("ERROR QUI CLAQUE")
                    this.alertService.error(error._body)
                })
    }

    goBack(){
      this.location.back()
    }
}
