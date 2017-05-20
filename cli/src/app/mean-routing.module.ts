import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDetailComponent }  from './components/case-detail.component';
import { CasesComponent }       from './components/cases.component';
import { IdentityComponent }    from './components/identity.component';
import { SearchCaseComponent }  from './components/search-case.component';

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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MeanRoutingModule {}
