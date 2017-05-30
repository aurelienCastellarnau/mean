import { Component, OnInit }     from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CaseService }  from '../services/case.service';
import { AlertService }  from '../services/alert.service';
import { Location }      from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: '../templates/case-register.component.html'
})

export class EditCaseComponent implements OnInit{
    model: any = {};
    private sub: any;
    id: string;
    constructor(
        private router: Router,
        private CaseService: CaseService,
        private alertService: AlertService,
        private location: Location,
        private route: ActivatedRoute
    ){}

    register() {
        console.log(this.id);
        this.CaseService.update(this.model, this.id)
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

  ngOnInit(): void {
    let that = this;

    console.log("[stack-trace] calling on ngOnInit with param: ", this.route.params)
    this.route.params
    .switchMap((params: Params) => this.CaseService.getCase(params['param']))
    .subscribe(function(c){
      console.log("suscribing:", c)
      that.model = c
      console.log(that.model)
    })

    this.sub = this.route.params.subscribe(params => {
        this.id = params['param'];
    })
}
}
