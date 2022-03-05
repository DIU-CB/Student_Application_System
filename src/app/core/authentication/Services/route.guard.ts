import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import { TokenService } from './token.service';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class RouteGuard implements CanActivate {
    constructor(
        private authService: AuthorizationService,
         private tokenService: TokenService,
          private route: ActivatedRoute){}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let active:boolean = false; 
            if (this.tokenService.hasToken()) {
                if (this.authService.isTokenExpired()) {
                    active = false;
                } else {
                    
                    //this.route.data.subscribe((res)=>{
                        // debugger
                        active = this.authService.isAuthorized(next.data.roles);
                    //})
                }
            } 
            return active;
    }

}