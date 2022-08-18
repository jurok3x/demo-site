import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthentificationService } from "../service/authentification.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private authService: AuthentificationService,
        private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if(this.authService.isApiAuthenticated() && this.authService.isAnalyticsAuthenticated()){
            return of(true)
        } else{
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        return this.canActivate(childRoute, state)
    }

}