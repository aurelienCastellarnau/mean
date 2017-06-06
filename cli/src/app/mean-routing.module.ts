import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { HomeComponent }           from './components/mean/home.component';
import { NavigationComponent }     from './components/mean/navigation.component';
import { LoginComponent }          from './components/mean/login.component';
import { RegisterComponent }       from './components/agent/register-agent.component';
import { AdminComponent }          from './components/agent/admin.component';
import { AgentComponent }          from './components/agent/agents.component';
import { AgentDetailComponent }    from './components/agent/agent-detail.component';
import { RegisterAgentComponent }  from './components/agent/agent-register.component';
import { EditAgentComponent }      from './components/agent/agent-edit.component';
import { CaseDetailComponent }     from './components/case/case-detail.component';
import { CasesComponent }          from './components/case/cases.component';
import { SearchCaseComponent }     from './components/case/search-case.component';
import { CaseRegisterComponent }   from './components/case/case-register.component';
import { EditCaseComponent }       from './components/case/cases-edit.component';
import { ElasticBrowserComponent } from './components/elastic/elastic-browser.component';
import { AuthGuard }               from './guards/auth.guard';
import { RoleGuard }               from './guards/role.guard';
import { PropertiesResolver }      from './services/propertiesResolver.service'

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
   {
    path: 'cases/:param/edit',
    component: EditCaseComponent,
    resolve: { properties: PropertiesResolver },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'create/case',
    component: CaseRegisterComponent,
    resolve: { properties: PropertiesResolver },
    canActivate: [AuthGuard, RoleGuard]
  },
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
    path: 'agents/:param/edit',
    component: EditAgentComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'create/agent',
    component: RegisterAgentComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'elasticsearch',
    component: ElasticBrowserComponent,
    canActivate: [AuthGuard, RoleGuard]
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
