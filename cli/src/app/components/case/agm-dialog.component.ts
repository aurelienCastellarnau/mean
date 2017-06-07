import { Component, Inject }      from '@angular/core';
import { MdDialog, 
         MdDialogRef,
         MD_DIALOG_DATA }         from '@angular/material';
import { AgmMap, AgmMarker }      from '@agm/core';

@Component({
    selector: "agm-dialog-component",
    templateUrl: '../../templates/case/agm-dialog.component.html',
    styleUrls:   ['../../style/agm-dialog.component.css']
})
export class AgmDialog {
    private x: number
    private y: number

    constructor(
        public dialogRef:                          MdDialogRef<AgmDialog>,
        @Inject(MD_DIALOG_DATA) public data:       any
    ){
        this.x = this.data.x
        this.y = this.data.y
    }
}
 