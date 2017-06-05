import {  Component, OnInit } from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params }             from '@angular/router';
import { AgentService }       from '../../services/agent.service';
import { AlertService }       from '../../services/alert.service';
import { Location }           from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: '../../templates/agent/agent-register.component.html',
})

export class EditAgentComponent implements OnInit {
    public model: any = {}
    public id: string

    private sub: any
    constructor(
        private router: Router,
        private AgentService: AgentService,
        private alertService: AlertService,
        private location: Location,
        private route: ActivatedRoute,
    ){}

    register() {
        console.log(this.id);
        this.AgentService.update(this.model, this.id)
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
    
    goBack() {
        this.location.back()
    }

    ngOnInit(): void {
        let that = this

        console.log("[stack-trace] calling on ngOnInit with param: ", this.route.params)
        this.route.params
            .switchMap((params: Params) => this.AgentService.getById(params['param']))
            .subscribe(function (c) {
                console.log("suscribing:", c)
                that.model = c
                console.log(that.model)
            })

        this.sub = this.route.params.subscribe(params => {
            this.id = params['param']
        })
    }
}
