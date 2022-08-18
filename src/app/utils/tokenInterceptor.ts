import { Injectable } from "@angular/core";
import { AuthentificationService } from "../service/authentification.service";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService: AuthentificationService,
        private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes('analytics')){
            if(this.authService.isAnalyticsAuthenticated()){
                req = req.clone({
                    setHeaders: {
                        Autorization: this.authService.getAnalyticsTApioken()
                    }
                })
            }
            return next.handle(req).pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleAutthError(error)
                )
            ) 
        } else {
            if(this.authService.isApiAuthenticated()){
                req = req.clone({
                    setHeaders: {
                        Autorization: this.authService.getApiToken()
                    }
                })
            }
            return next.handle(req).pipe(
                catchError(
                    (error: HttpErrorResponse) => this.handleAutthError(error)
                )
            )
        }   
    }

    private handleAutthError(error: HttpErrorResponse): Observable<any>{
        if(error.status === 401){
            this.router.navigate(['/login'], {
                queryParams: {
                    sessionExpired: true
                }
            })

        }
        return throwError(() => error)
    }

}