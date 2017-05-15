import { Component } from '@angular/core';
import { Location }  from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: '../templates/navigation.component.html',
  styleUrls: ['../style/mean.component.css']
})
export class NavigationComponent {
    constructor(
      private location: Location,
      ){}
    /*
    ** Pas besoin de logique ici pour l'instant
    ** mais on peut imaginer une gestion des droits
    ** d'accès aux routes ici.
    ** En implémentant un service profile ou auth
    ** on pourrait setter une variable de role 
    ** en fonction du token et faire disparaitre 
    ** les links de la vue si l'utilisateur n'a pas accès.
    ** ça n'empêche pas un check côté api, mais ca cache
    ** l'archi aux sous-fifres...
    */
    goBack(){
      this.location.back()
    }
}