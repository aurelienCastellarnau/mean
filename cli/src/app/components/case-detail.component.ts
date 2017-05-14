import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import                              'rxjs/add/operator/switchMap';
import { Case }                     from '../model/case';
import { CaseService }              from '../services/case.service';

@Component({
  selector: 'case-detail',
  templateUrl: '../templates/case-detail.component.html',
})
export class CaseDetailComponent implements OnInit {
  @Input() case:         Case;
  param:                 string;
  constructor(
    private CaseService: CaseService,
    private route:       ActivatedRoute
  ) {}

  ngOnInit(): void {
    let that = this;
    this.route.params

    .switchMap((params: Params) => this.CaseService.getCase(params['param']))
    .subscribe(function(c){
      console.log("suscribing:", c[0])
      that.case = c[0]
      console.log(that.case)
    })
  }
}
