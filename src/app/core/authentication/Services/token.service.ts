import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  public token: string;
  private tokenKey = "token";
  constructor() {
    let ls = localStorage.getItem(this.tokenKey);
    if (ls) {
      let currentUser = JSON.parse(localStorage.getItem(this.tokenKey));
      this.token = currentUser && currentUser.token;  
    }
    
  }

  setItem(token:any){
    this.token = JSON.stringify(token)
    localStorage.setItem(this.tokenKey, this.token);
  }

  getItem():any{
    this.token = JSON.parse(localStorage.getItem(this.tokenKey));
    return this.token;
  }

  getToken():any{
    let tk = JSON.parse(localStorage.getItem(this.tokenKey));
    if (tk) {
      
      //console.log("bearer " + tk.tokens.accessToken);
      return "bearer " + tk.tokens.accessToken;
    }
    return null;
  }

  getUserToken():any{
    var tk = localStorage.getItem(this.tokenKey)
    var tkp = JSON.parse(tk)
    if (tkp && tkp.user) {
      //console.log("bearer " + tk.tokens.accessToken);
      return tkp.user;
    }
    return null;
  }

  hasToken():boolean{
    if (this.getToken() != null) {
      return true;
    }
    return false;
  }
  
  removeItem(){
    localStorage.removeItem(this.tokenKey);
    this.token = null;
  }

}
