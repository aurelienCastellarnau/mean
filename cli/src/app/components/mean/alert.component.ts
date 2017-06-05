import { Component, OnInit } from '@angular/core';
import { AlertService }      from '../../services/alert.service';

@Component({
    moduleId:    module.id,
    selector:    'alert',
    templateUrl: '../../templates/mean/alert.component.html',
})

export class AlertComponent {
    public message: any
    
    constructor(private alertService: AlertService){}

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {this.message = message})
    }
}
