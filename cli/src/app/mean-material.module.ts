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
import { TypeaheadModule }         from 'ngx-bootstrap';
import { PopoverModule }           from 'ngx-bootstrap';

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
        MaterialModule,
        TypeaheadModule.forRoot(),
        PopoverModule.forRoot(),
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
    ]
})
export class MeanMaterialModule {}
