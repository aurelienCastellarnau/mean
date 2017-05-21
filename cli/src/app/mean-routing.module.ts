import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDetailComponent }  from './components/case-detail.component';
import { CasesComponent }       from './components/cases.component';
import { SearchCaseComponent }  from './components/search-case.component';
import { NavigationComponent }  from './components/navigation.component';
import { LoginComponent }       from './components/login.component';
import { AuthGuard }            from './guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component: NavigationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'search',
    component: SearchCaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cases/:param',
    component: CaseDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cases',
    component: CasesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MeanRoutingModule {}
