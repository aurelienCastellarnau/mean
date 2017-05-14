/*
** Tout les imports de l'app doivent à priori être listés ici
*/
import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { HttpModule }         from '@angular/http';

/*
** Notre routing côté client. Très élaboré sur angular2,
** c'est du single page mais avec possibilité d'utiliser
** les boutons précédents et suivant des navigateurs.
*/
import { MeanRoutingModule }  from './mean-routing.module';

/*
** components, c'est l'outil central d'angular 2
** pour nous; MeanComponent est le point d'entré
** il affiche juste la navigation.
** 
** CaseDetailComponent => [ngRouter]: '/cases/:param' 
**                     => [nodejsRoute]: /cases/:id
**    -- Ce component fait un GET 
**    -- lorsqu'on l'appelle avec
**    -- le paramètre qu'il reçoit.
**    -- display un formulaire d'édition
** 
** CasesComponent: => [ngRouter]: '/cases'
**                 => [nodejsRoute]: '/cases'
**    -- Get all, display un tableau avec tout les cases.
**
** SearchCaseComponent: => [ngRouter]: 'search' et 'search/:param'
**    -- Utilise CaseDetailComponent pour lié le contenu 
**    -- de l'input de la search bar avec des appels
**    -- à l'api. 
**    -- Une fois le case réceptionné, CaseDetailComponent l'affiche. 
**
** NavigationComponent: 
**    -- Pose le template pour la navigation qui utilise 
**    -- les directives du router 'routerLink' et display
**    -- le <router-outlet></router-outlet>. 
**    -- Dans le component, on trouve un appel à Location 
**    -- qui permet de gérer les goback()...
*/
import { MeanComponent }       from './components/mean.component';
import { CaseDetailComponent } from './components/case-detail.component';
import { CasesComponent }      from './components/cases.component';
import { SearchCaseComponent } from './components/search-case.component';
import { NavigationComponent } from './components/navigation.component';

/*
** model, routing et services
** CaseService est le service qui contact l'API
** ErrorHandlerService permet de gérer les erreurs
** sous la forme de promises pour l'instant,
** ca correspond à la forme de nos requêtes.
*/
import { Case } from './model/case';
import { CaseService } from './services/case.service';
import { ErrorHandlerService } from './services/error-handler.service';

/*
** GENERALS MODULES
*/

/*
** Doc officielle:
** Defines a module that contains 
** components, 
** directives
** pipes, 
** and providers.
*/
@NgModule({

  /*
  ** Doc officielle:
  ** imports: [BrowserModule, SomeOtherModule]
  **
  ** List of modules to import into this module. 
  ** Everything from the imported modulesavailable 
  ** to declarations of this module.
  ** MeanRouting c'est du fait maison à base de tutos,
  ** le reste c'est du natif.
  ** du coup la hiérarchie c'est:
  ** app composée de modules composés de components
  **    les components utilises:
  **      des services, un model, des templates etc...
  */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MeanRoutingModule,
  ],

  /*
  ** Doc officielle:
  ** declarations: [MyRedComponent, MyBlueComponent, MyDatePipe]
  **
  ** List of components, 
  ** directives, and pipes (?)
  ** that belong to this module.
  */
  declarations: [
    MeanComponent,
    CasesComponent,
    CaseDetailComponent,
    SearchCaseComponent,
    NavigationComponent,
  ],

  /*
  ** Doc officielle:
  ** providers: [MyService, { provide: ... }]
  **
  ** List of dependency injection providers 
  ** visible both to the contents of this module 
  ** and to importers of this module.
  */
  providers: [
    CaseService,
    ErrorHandlerService,
  ],

  /*
  ** Doc officielle:
  ** bootstrap: [MyMeanComponent]
  ** List of components to bootstrap 
  ** when this module is bootstrapped.
  ** 
  ** Au départ, j'avais répété tout les components ici,
  ** il semblerait qu'il cherchait à tous les transpiler
  ** indépendamment... en bootstrapant uniquement le point
  ** d'entrée, il fait les appels nécessaires grâce
  ** à ce fichier...
  */
  bootstrap: [
    MeanComponent,
  ]
})
export class MeanModule { }
