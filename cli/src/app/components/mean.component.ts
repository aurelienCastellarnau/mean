import { Component }             from '@angular/core';
import { Case }                  from '../model/case';
import { NavigationComponent }   from './navigation.component';

@Component({
  selector:    'mean-root',
  templateUrl: '../templates/mean.component.html',
  styleUrls:   ['../style/mean.component.css']
})

export class MeanComponent {
    title = 'Police Cases Analytics ~ A Mean 2.0 Project';

}
