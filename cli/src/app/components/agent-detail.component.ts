import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute}           from '@angular/router';
import { Agent }                     from '../model/agent';
import { AgentService }              from '../services/agent.service';

@Component({
  selector:    'agent-detail',
  templateUrl: '../templates/agent-detail.component.html',
})

export class AgentDetailComponent implements OnInit {
  @Input() agent:         Agent[];
  id:                     string;

  constructor(
    private AgentService: AgentService,
    private route:       ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("[stack-trace] calling on ngOnInit with param: ", this.route.params)
    this.route.params.subscribe(params => {
       this.id = params['param'];
       console.log(params['param']);
    });
    // this.AgentService.getById(this.id)
    //     .subscribe(agent => { this.agent = agent; console.log(agent);});
    // }
    }
}
