import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { isArray } from 'rxjs/internal/util/isArray';
import { ServerAuthConfig } from './service.config';

@Injectable({
  providedIn: 'root'
})
export class ApplicationAuthQueryService {
    apiUrl = new ServerAuthConfig().apiUrl;
    constructor(private http: HttpClient ,private tokenService: TokenService, private router: Router) {
    
    }

    Get(){
        return this.http.get(this.apiUrl + "Applications")
    }
    
}