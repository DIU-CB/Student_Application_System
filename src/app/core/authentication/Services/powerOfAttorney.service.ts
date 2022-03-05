import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { ServerAuthConfig } from './service.config';

@Injectable({
  providedIn: 'root'
})
export class PowerOfAttorneyService {
    apiUrl = new ServerAuthConfig().apiUrl;
    controller:string = "PowerOfAttorneys"
    constructor(private http: HttpClient ,private tokenService: TokenService, private router: Router) {
    
    }

    GetPowerOfAttorneysTo(){
        return this.http.get(this.apiUrl + this.controller + "/to")
    }

    GetPowerOfAttorneysForm(_params){
        _params['applicationId'] = '4b0bbab5-5c12-4f24-84b5-004c33d79a90';
        return this.http.get(this.apiUrl + this.controller + "/from", {params: _params})
    }

    Save(_data:any){
        return this.http.post(this.apiUrl + this.controller, _data)
    }

    Delete(_data:any){
        // return this.http.delete(this.apiUrl + this.controller, {data: _data})
        return this.http.request('delete', this.apiUrl + this.controller, { body: _data })
    }
}