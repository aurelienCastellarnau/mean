import { Component }    from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
    moduleId:    module.id,
    selector:    'alert',
    templateUrl: '../../templates/mean/alert.component.html',
})

export class AlertComponent {
    public message: any
    
    constructor(private alertService: AlertService){
        const that = this
        this.alertService.toggleAlert$.subscribe(message => {
            this.message = message
            console.log("alert subscription: ", this.message)})
            setTimeout(function(){
                delete that.message
            }, 5000)
        }
}
