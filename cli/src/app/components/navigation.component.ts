import { Component }             from '@angular/core';
import { Location }              from '@angular/common';
import { RouterModule }          from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Agent }                 from '../model/agent';
import { AgentService }          from '../services/agent.service';
/*
** clues...
import { RequestOptions }      from '@angular/http';
import { ErrorHandlerService } from '../services/error-handler.service'
import { TokenService }        from '../services/token.service';
*/

@Component({
  selector:    'navigation',
  templateUrl: '../templates/navigation.component.html',
  styleUrls:   ['../style/navigation.component.css']
})
export class NavigationComponent {
    currentUser: Agent;
    option: string;

    constructor(
        private location: Location,
        public dialog: MdDialog,
        ){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    goBack(){
      this.location.back()
    }
}
