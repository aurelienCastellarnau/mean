import { Component }             from '@angular/core';
import { Location }              from '@angular/common';
import { RouterModule, Router }  from '@angular/router';
import { Agent }                 from '../../model/agent';
import { AgentService }          from '../../services/agent.service';
import { AlertService }          from '../../services/alert.service';
import { ToggleService }         from '../../services/toggle.service';

@Component({
  selector:    'navigation',
  templateUrl: '../../templates/mean/navigation.component.html',
  styleUrls:   ['../../style/navigation.component.css'],
})

export class NavigationComponent {
    public title =       'Police Cases Analytics ~ A Mean 4.0 Project'
    public currentUser:   Agent
    public option:        string
    public awaiting =     false

    constructor(
        private location: Location,
        private toggle:   ToggleService,        
    ){
      const that = this
      this.toggle.userToggled$.subscribe(function(user: Agent){
        that.currentUser = user
        console.log("current user set: ", that.currentUser)     
      })
      this.toggle.awaitingToggled$.subscribe(function(awaiting){
        that.awaiting = awaiting
      })
    }

    goBack(){
      this.location.back()
    }
}
