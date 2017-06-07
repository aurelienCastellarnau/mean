import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { FormsModule }             from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdIconRegistry }          from '@angular/material';
import { MeanMaterialModule }      from './mean-material.module';
import { MeanRoutingModule }       from './mean-routing.module';
import { MeanComponent }           from './components/mean.component';
import { NavigationComponent }     from './components/mean/navigation.component';
import { LoginComponent }          from './components/mean/login.component';
import { HomeComponent }           from './components/mean/home.component';
import { AlertComponent }          from './components/mean/alert.component';
import { AgentComponent }          from './components/agent/agents.component';
import { AgentDetailComponent }    from './components/agent/agent-detail.component';
import { RegisterAgentComponent }  from './components/agent/agent-register.component';
import { EditAgentComponent }      from './components/agent/agent-edit.component';
import { RegisterComponent }       from './components/agent/register-agent.component';
import { AdminComponent }          from './components/agent/admin.component';
import { CaseDetailComponent }     from './components/case/case-detail.component';
import { CasesComponent }          from './components/case/cases.component';
import { CaseRegisterComponent }   from './components/case/case-register.component';
import { EditCaseComponent }       from './components/case/cases-edit.component';
import { SearchCaseComponent }     from './components/case/search-case.component';
import { EditDialog }              from './components/case/edit-dialog.component';
import { ElasticBrowserComponent } from './components/elastic/elastic-browser.component';
import { ElasticCasesComponent }   from './components/elastic/elastic-cases.component';
import { Case }                    from './model/case';
import { Agent }                   from './model/agent';
import { CaseService }             from './services/case.service';
import { AgentService }            from './services/agent.service';
import { AlertService }            from './services/alert.service';
import { ErrorHandlerService }     from './services/error-handler.service';
import { AuthenticationService }   from './services/auth.service';
import { PagerService }            from './services/paginator.service';
import { PropertiesResolver }      from './services/propertiesResolver.service';
import { ElasticService }          from './services/elastic.service';
import { ToggleService }           from './services/toggle.service';
import { StatusPipe }              from './pipes/status.component';
import { AuthGuard }               from './guards/auth.guard';
import { RoleGuard }               from './guards/role.guard';
import { NgxPaginationModule }     from 'ngx-pagination';
import { AgmCoreModule }           from '@agm/core';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MeanRoutingModule,
    MeanMaterialModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCMahLE0xsZwHbEGOQ9iYVw1IMytXXUnCM'
    })
  ],
  declarations: [
    MeanComponent,
    CasesComponent,
    CaseDetailComponent,
    SearchCaseComponent,
    ElasticBrowserComponent,
    ElasticCasesComponent,
    EditDialog,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    AgentComponent,
    AgentDetailComponent,
    RegisterAgentComponent,
    AlertComponent,
    EditAgentComponent,
    CaseRegisterComponent,
    EditCaseComponent,
    RegisterComponent,
    AdminComponent,
    StatusPipe
  ],
  providers: [
    CaseService,
    ErrorHandlerService,
    MdIconRegistry,
    AuthGuard,
    RoleGuard,
    AuthenticationService,
    AgentService,
    AlertService,
    PropertiesResolver,
    PagerService,
    ElasticService,
    ToggleService
  ],
  entryComponents: [EditDialog],
  bootstrap: [MeanComponent]
})
export class MeanModule{}
