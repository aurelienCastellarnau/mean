import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CaseDetailComponent }  from './components/case-detail.component';
import { CasesComponent }       from './components/cases.component';
import { SearchCaseComponent }  from './components/search-case.component';

/*
** Ce fichier centralise le routing
** on pourrait envisager un fichier
** contenant les routes mais
** tout mettre ici me parait bien!
*/
const routes: Routes = [
  {
    path: 'search',
    component: SearchCaseComponent
  },
  {
    path: 'cases/:param',
    component: CaseDetailComponent
  },
  {
    path: 'cases',
    component: CasesComponent
  },
];

/*
** @NgModule: déclaration d'un module, grâce à l'import NgModule
** le module importe le router module d'angular, set nos routes
** et l'exporte.
*/
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MeanRoutingModule {}
