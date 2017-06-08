import { NgModule }                from '@angular/core';
import { MdMenuModule }            from '@angular/material';
import { MdSidenavModule }         from '@angular/material';
import { MdCardModule }            from '@angular/material';
import { MdInputModule }           from '@angular/material';
import { MdGridListModule }        from '@angular/material';
import { MdListModule }            from '@angular/material';
import { MdButtonModule }          from '@angular/material';
import { MdIconModule }            from '@angular/material';
import { MdToolbarModule }         from '@angular/material';
import { MaterialModule }          from '@angular/material';
import { MdDialogModule,
         MdDialogRef}              from '@angular/material';
import { MdDatepickerModule,
         MdNativeDateModule }      from '@angular/material';
import { TypeaheadModule }         from 'ngx-bootstrap';
import { PopoverModule }           from 'ngx-bootstrap';
import { TabsModule }              from 'ngx-bootstrap';
import { ButtonsModule }           from 'ngx-bootstrap';
import { PaginationModule }        from 'ngx-bootstrap';
import { AccordionModule }         from 'ngx-bootstrap';


@NgModule({
    imports: [
        MdCardModule,
        MdButtonModule,
        MdMenuModule,
        MdIconModule,
        MdSidenavModule,
        MdToolbarModule,
        MdGridListModule,
        MdListModule,
        MdInputModule,
        MdDialogModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MaterialModule,
        TypeaheadModule.forRoot(),
        PopoverModule.forRoot(),
        TabsModule.forRoot(),
        ButtonsModule.forRoot(),
        PaginationModule.forRoot(),
        AccordionModule.forRoot()
    ],
    exports: [
        MdCardModule,
        MdMenuModule,
        MdButtonModule,
        MdIconModule,
        MdSidenavModule,
        MdToolbarModule,
        MdGridListModule,
        MdListModule,
        MdInputModule,
        MaterialModule,
        TypeaheadModule,
        PopoverModule,
        MdDatepickerModule,
        MdNativeDateModule,
        TabsModule,
        ButtonsModule,
        PaginationModule,
        AccordionModule
    ]
})
export class MeanMaterialModule {}
