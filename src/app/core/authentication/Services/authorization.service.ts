import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { isArray } from 'rxjs/internal/util/isArray';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private userToken:any;
  constructor(private http: HttpClient ,private tokenService: TokenService, private router: Router) {
    
  }

  isAuthorized(arg:any):boolean{
    // debugger
    var userToken = this.tokenService.getUserToken();
    if (isArray(arg)) {
      for(var i =0; i < userToken.roles.length; i++){
        var elem = userToken.roles[i];
        //var name = elem.toLowerCase();
        if (arg.indexOf(elem) != -1) {
          return true;
        }
      }
      
    } else {
      for(var i =0; i < userToken.roles.length; i++){
        var elem = userToken.roles[i];
        if(elem.toLowerCase() == arg){
          return true;
        }
      }
    }
    
    return false;
  }

 


  isTokenExpired(){
    let exp = false;
    let tokenObj = this.tokenService.getItem();
    let expTime = new Date(tokenObj.tokens.expiration);
    //var expTime = new Date("2018-06-11T10:00:06Z");
    let currentTime = new Date();
    if(expTime < currentTime){
      exp = true;
    } else {
      exp = false;
    }
    return exp;
  }
}
