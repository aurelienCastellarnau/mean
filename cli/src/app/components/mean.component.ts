import { Component } from '@angular/core';
import { Case } from '../model/case';
import { NavigationComponent } from './navigation.component';

/*
** CONTEXT OF THE COMPONENT
** selector: <mean-root></mean-root>
*/
@Component({
  selector: 'mean-root',
  templateUrl: '../templates/mean.component.html',
  styleUrls: ['../style/mean.component.css']
})

export class MeanComponent {
  /*
  ** une variable exploitable dans le template
  */
  title = 'Mean Project... building...';
}
