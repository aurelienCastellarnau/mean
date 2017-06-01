import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { CaseDetailComponent }    from './components/case-detail.component';
import { CasesComponent }         from './components/cases.component';
import { SearchCaseComponent }    from './components/search-case.component';
import { NavigationComponent }    from './components/navigation.component';
import { LoginComponent }         from './components/login.component';
import { AuthGuard }              from './guards/auth.guard';
import { RoleGuard }              from './guards/role.guard';
import { HomeComponent }          from './components/home.component';
import { AgentComponent }         from './components/agents.component';
import { AgentDetailComponent }   from './components/agent-detail.component';
import { RegisterAgentComponent } from './components/agent-register.component';
import { EditAgentComponent }     from './components/agent-edit.component';
import { RegisterCaseComponent }  from './components/case-register.component';
import { EditCaseComponent }      from './components/cases-edit.component';
import { RegisterComponent }      from './components/register-agent.component';
import { AdminComponent }         from './components/admin.component';
import { PropertiesResolver }     from './services/propertiesResolver.service'

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
    component: RegisterCaseComponent,
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
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MeanRoutingModule {}
