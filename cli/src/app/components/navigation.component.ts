import { Component }           from '@angular/core';
import { Location }            from '@angular/common';
import { RouterModule }        from '@angular/router';
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
    constructor(private location: Location){}

    goBack(){
      this.location.back()
    }
}
