import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { CaseDetailComponent }    from './components/case-detail.component';
import { CasesComponent }         from './components/cases.component';
import { SearchCaseComponent }    from './components/search-case.component';
import { NavigationComponent }    from './components/navigation.component';
import { LoginComponent }         from './components/login.component';
import { AuthGuard }              from './guards/auth.guard';
import { HomeComponent }          from './components/home.component';
import { AgentComponent }         from './components/agents.component';
import { AgentDetailComponent }   from './components/agent-detail.component';
import { RegisterAgentComponent } from './components/agent-register.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
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
  // {
  //   path: 'create/case',
  //   component: CreateCaseComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'cases',
    component: CasesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'agents',
    component: AgentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'agents/:param',
    component: AgentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create/agent',
    component: RegisterAgentComponent,
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
