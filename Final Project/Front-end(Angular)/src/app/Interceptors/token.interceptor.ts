import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminloginService } from '../service/adminlogin.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public service:AdminloginService,private route:Router,private toastr:NgToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.service.getToken();

    if(myToken)
    {
      request = request.clone({
        setHeaders : {Authorization:`Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401)
          {
            this.toastr.error({detail:"ERROR",summary:"Token is Expired, Please Login Again",duration:3000});
            this.service.LoggedOut();
            this.route.navigate(['/admin']);
          }
        }
        return throwError(() => new Error("Some other error occured"))
      })
    );
  }
}
