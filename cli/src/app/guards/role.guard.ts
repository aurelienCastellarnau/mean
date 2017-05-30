import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(
        private router: Router
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser.role === 'CHEF' || currentUser.role === 'DETECTIVE') {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }});
        return false;
    }

}
