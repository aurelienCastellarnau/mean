import { Injectable }           from '@angular/core';
import { Router,
        CanActivate,
        ActivatedRouteSnapshot,
        RouterStateSnapshot }   from '@angular/router';
import { AlertService }         from '../services/alert.service';

@Injectable()
export class SuperUserGuard implements CanActivate {
    constructor(private router: Router, private alert: AlertService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))

        if (currentUser.role === 'CHEF') {
            return true
        }
        console.log("This action is reserved to the higher hierarchy level.")
        this.alert.error("This action is reserved to the higher hierarchy level.", true)
        this.router.navigate(['/home'], { queryParams: {returnUrl: state.url }})
        return false
    }
}
