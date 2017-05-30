import { Component, OnInit }   from '@angular/core';
import { Agent }                from '../model/agent';
import { MeanMaterialModule }  from '../mean-material.module';
import { AgentService }         from '../services/agent.service';

@Component({
    selector:    'agents',
    templateUrl: '../templates/agents.component.html',
    providers: [AgentService]
})
export class AgentComponent implements OnInit {
    agents: Agent[];
    constructor(
        private AgentService:  AgentService,
    ){}

    getAgents(): void {
        this.AgentService.getAll()
            .subscribe(agents => { this.agents = agents; console.log(agents);});
    }

    ngOnInit(): void {
        this.getAgents()
    }

}
