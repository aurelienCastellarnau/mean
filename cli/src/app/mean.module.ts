import { BrowserModule }       from '@angular/platform-browser';
import { NgModule }            from '@angular/core';
import { FormsModule }         from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { MeanRoutingModule }   from './mean-routing.module';
import { MeanComponent }       from './components/mean.component';
import { CaseDetailComponent } from './components/case-detail.component';
import { CasesComponent }      from './components/cases.component';
import { SearchCaseComponent } from './components/search-case.component';
import { NavigationComponent } from './components/navigation.component';
import { Case }                from './model/case';
import { CaseService }         from './services/case.service';
import { ErrorHandlerService } from './services/error-handler.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MeanRoutingModule,
  ],
  declarations: [
    MeanComponent,
    CasesComponent,
    CaseDetailComponent,
    SearchCaseComponent,
    NavigationComponent,
  ],
  providers: [CaseService, ErrorHandlerService],
  bootstrap: [MeanComponent]
})
export class MeanModule{}
