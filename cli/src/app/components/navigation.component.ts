import { Component }             from '@angular/core';
import { Location }              from '@angular/common';
import { RouterModule }          from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { IdentityComponent }     from './identity.component';
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
    option: string;

    constructor(
        private location: Location,
        public dialog: MdDialog,
        ){}

    openIdentity(){
        let identityRef = this.dialog.open(IdentityComponent);
        identityRef.afterClosed().subscribe(result => {
            this.option = result;
        })

    }

    goBack(){
      this.location.back()
    }
}
