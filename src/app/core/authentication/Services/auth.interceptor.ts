
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { TokenService } from '../_services/token.service';

//import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private routes: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let tokenService = new TokenService();

    let tk = localStorage.getItem('token');
    if (tk) {
      tk = JSON.parse(tk).tokens.accessToken
      tk = "bearer " + tk;
    } else {
      tk = "";
    }

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': tk
      },
    });

    return next.handle(req)
    // .do(
    //   (event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       // do stuff with response if you want
    //       //this.notify.getErrorWithStatus(event);
    //     }
        
    //   }
    //   , (err: any) => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 401) {
    //         this.routes.navigate(['/login']);
    //         //console.log('sadfsadf')
    //       }

    //       //this.notify.getErrorWithStatus(err);
    //     }
    //   }
    // )
  }
}