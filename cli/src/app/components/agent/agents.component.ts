import { Component, OnInit }   from '@angular/core';
import { Agent }               from '../../model/agent';
import { MeanMaterialModule }  from '../../mean-material.module';
import { AgentService }        from '../../services/agent.service';
import { ErrorHandlerService } from '../../services/error-handler.service';     

@Component({
    selector:    'agents',
    templateUrl: '../../templates/agent/agents.component.html',
    providers:   [AgentService]
})
export class AgentComponent implements OnInit {
    public agents:              Agent[]
    public properties:          String

    constructor(
        private AgentService:   AgentService,
        private errorHandler:   ErrorHandlerService,
    ){}

    getAgents(): void {
        this.AgentService.getAll()
            .subscribe(agents => { this.agents = agents; console.log(agents);});
    }

    getProperties(): void {
        const that = this

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
