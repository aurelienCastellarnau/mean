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
    ]
})
export class MeanMaterialModule {}
