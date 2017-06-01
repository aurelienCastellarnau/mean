import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { FormsModule }             from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdIconRegistry }          from '@angular/material';
import { MeanMaterialModule }      from './mean-material.module';
import { MeanRoutingModule }       from './mean-routing.module';
import { MeanComponent }           from './components/mean.component';
import { CaseDetailComponent }     from './components/case-detail.component';
import { CasesComponent }          from './components/cases.component';
import { SearchCaseComponent }     from './components/search-case.component';
import { NavigationComponent }     from './components/navigation.component';
import { LoginComponent }          from './components/login.component';
import { HomeComponent }           from './components/home.component';
import { AgentComponent }          from './components/agents.component';
import { Case }                    from './model/case';
import { Agent }                   from './model/agent';
import { CaseService }             from './services/case.service';
import { AgentService }            from './services/agent.service';
import { AlertService }            from './services/alert.service';
import { ErrorHandlerService }     from './services/error-handler.service';
import { AuthenticationService }   from './services/auth.service';
import { AuthGuard }               from './guards/auth.guard';
import { RoleGuard }               from './guards/role.guard';
import { AgentDetailComponent }    from './components/agent-detail.component';
import { RegisterAgentComponent }  from './components/agent-register.component';
import { AlertComponent }          from './components/alert.component';
import { EditAgentComponent }      from './components/agent-edit.component';
import { RegisterCaseComponent }   from './components/case-register.component';
import { EditCaseComponent }       from './components/cases-edit.component';
import { RegisterComponent }       from './components/register-agent.component';
import { AdminComponent }          from './components/admin.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MeanRoutingModule,
    MeanMaterialModule,
  ],
  declarations: [
    MeanComponent,
    CasesComponent,
    CaseDetailComponent,
    SearchCaseComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    AgentComponent,
    AgentDetailComponent,
    RegisterAgentComponent,
    AlertComponent,
    EditAgentComponent,
    RegisterCaseComponent,
    EditCaseComponent,
    RegisterComponent,
    AdminComponent
  ],
  providers: [
    CaseService,
    ErrorHandlerService,
    MdIconRegistry,
    AuthGuard,
    RoleGuard,
    AuthenticationService,
    AgentService,
    AlertService
  ],
  bootstrap: [MeanComponent]
})
export class MeanModule{}
