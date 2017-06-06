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
    title =               'Police Cases Analytics ~ A Mean 4.0 Project'
    currentUser:          Agent
    option:               string
    constructor(
        private location: Location,
        public dialog:    MdDialog,
        ){this.currentUser = JSON.parse(localStorage.getItem('currentUser'))}

    goBack(){
      this.location.back()
    }
}
