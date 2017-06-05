import { Injectable }            from '@angular/core'
import { Resolve, 
         ActivatedRouteSnapshot, 
         RouterStateSnapshot}    from '@angular/router'
import { Observable }            from  'rxjs/Observable'
import { CaseService }           from './case.service'

 @Injectable()
 export class PropertiesResolver implements Resolve<String[]>{
    constructor(private CaseService: CaseService){}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        return this.CaseService.getProperties()
    }
 }
 