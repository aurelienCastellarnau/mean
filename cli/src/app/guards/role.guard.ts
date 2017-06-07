import { Injectable }            from '@angular/core';
import { Router, 
         CanActivate, 
         ActivatedRouteSnapshot, 
         RouterStateSnapshot }   from '@angular/router';
import { AlertService }          from '../services/alert.service';

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private router: Router, private alert: AlertService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        
        if (currentUser.role === 'CHEF' || currentUser.role === 'DETECTIVE') {
            return true
        }
        console.log("You must have higher autorisations")
        this.alert.error("You must have higher autorisations", true)
        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }})
        return false
    }
}
