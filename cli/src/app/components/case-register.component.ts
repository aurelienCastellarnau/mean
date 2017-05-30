import { Component }     from '@angular/core';
import { Router }        from '@angular/router';
import { CaseService }  from '../services/case.service';
import { AlertService }  from '../services/alert.service';
import { Location }      from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: '../templates/case-register.component.html'
})

export class RegisterCaseComponent {
    model: any = {};

    constructor(
        private router: Router,
        private CaseService: CaseService,
        private alertService: AlertService,
        private location: Location
    ){}

    register() {
        this.CaseService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration succesful', true);
                    this.router.navigate(['/cases/']);
                },
                error => {
                    console.log("ERROR QUI CLAQUE");
                    this.alertService.error(error._body);
                })
    }
    goBack(){
      this.location.back()
    }
}
