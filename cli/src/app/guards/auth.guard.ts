import { Injectable }           from '@angular/core';
import { Router, 
        CanActivate, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot }   from '@angular/router';
import { AlertService }         from '../services/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private alert: AlertService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('currentUser')) {
            return true
        }
        console.log("You must be connected")
        this.alert.error("You must be connected", true)
        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }})
        return false
    }
}
