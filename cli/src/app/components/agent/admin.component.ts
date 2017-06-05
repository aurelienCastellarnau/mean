import { Component, OnInit }   from '@angular/core';
import { Agent }               from '../../model/agent';
import { MeanMaterialModule }  from '../../mean-material.module';
import { AgentService }        from '../../services/agent.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { TabsetComponent }     from 'ngx-bootstrap';

@Component({
    selector:    'agents',
    templateUrl: '../../templates/agent/agents.component.html',
    providers:   [AgentService]
})
export class AdminComponent implements OnInit {
    public agents:              Agent[];
    public properties:          String;
    public active =             {status: 'active'}
    public waiting =            {status: 'waiting'}

    constructor(
        private AgentService:   AgentService,
        private errorHandler:   ErrorHandlerService,
    ){}

    getAgents(): void {
        this.AgentService.getAdmin()
            .subscribe(agents => { this.agents = agents; console.log(agents);});
    }

    delete(_id: string): void {
        this.AgentService.delete(_id)
            .subscribe(
                data => {
                    console.log('Successfully deleted')
                    this.getAgents();
                },
                error => {
                    console.log(error)
                })
    }

    accept(_id: string): void {
        this.AgentService.accept(_id)
            .subscribe(
                data => {
                    console.log('Successfully accepted')
                    this.getAgents();
                },
                error => {
                    console.log(error);
                })
            }

    getProperties(): void {
        const that = this;

        this.AgentService.getProperties()
            .then(function(properties){
                console.log(properties)
                that.properties = properties
                console.log("[mean] Agents getProperties() succeed, properties loaded with: ", that.properties)
            })
            .catch(function(err){
                console.log(err)
                that.errorHandler.handlePromise(err)
            })
    }

    ngOnInit(): void {
        this.getAgents()
        this.getProperties()
    }
}
