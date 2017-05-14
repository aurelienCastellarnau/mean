import { Component }    from '@angular/core';
import { Location }     from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: '../templates/navigation.component.html',
  styleUrls: ['../style/mean.component.css']
})
export class NavigationComponent {
    constructor(private location: Location){}

    goBack(){
      this.location.back()
    }
}
