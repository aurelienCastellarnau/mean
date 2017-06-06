import { Component }             from '@angular/core';
import { Location }              from '@angular/common';
import { RouterModule }          from '@angular/router';
import { Agent }                 from '../../model/agent';
import { AgentService }          from '../../services/agent.service';

@Component({
  selector:    'navigation',
  templateUrl: '../../templates/mean/navigation.component.html',
  styleUrls:   ['../../style/navigation.component.css'],
})

export class NavigationComponent {
    public title =               'Police Cases Analytics ~ A Mean 4.0 Project'
    public currentUser:           Agent
    public option:                string

    constructor(
        private location:         Location,
        ){this.currentUser = JSON.parse(localStorage.getItem('currentUser'))}

    goBack(){
      this.location.back()
    }
}
