import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '../services/errors.service';
import { SiteError } from '../models/site-error';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private errorSvc: ErrorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse && SiteError.isCritical(error.status)){
                    console.log("critical server error:", error.message);
                    this.router.navigate(['error']);
                }
                   
                console.log("server error:", error);
                return throwError(() => new Error(error.message))
            })
        )
      }
}