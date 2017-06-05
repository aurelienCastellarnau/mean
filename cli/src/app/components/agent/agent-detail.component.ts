import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params}    from '@angular/router';
import { Agent }                    from '../../model/agent';
import { AgentService }             from '../../services/agent.service';

@Component({
  selector:    'agent-detail',
  templateUrl: '../../templates/agent/agent-detail.component.html',
})

export class AgentDetailComponent implements OnInit {
  @Input() agent:         Agent;
  public id:              string;

  constructor(
    private AgentService: AgentService,
    private route:        ActivatedRoute
  ){}

ngOnInit(): void {
    let that = this;

    console.log("[stack-trace] calling on ngOnInit with param: ", this.route.params)
    this.route.params
    .switchMap((params: Params) => this.AgentService.getById(params['param']))
    .subscribe(a => {
      console.log("suscribing:", a)
      this.agent = a
      console.log(this.agent)
    })
  }
}
