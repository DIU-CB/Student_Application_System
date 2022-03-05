import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IServiceController } from "../../serviceModule/service.interface";
import { ServerAuthConfig } from "./service.config";


@Injectable({
    providedIn: 'root'
})

export class AuthenticationService implements IServiceController{
  apiUrl:any = new ServerAuthConfig();
  controller = 'token';
  constructor( private httpClient: HttpClient) { }

  Login(data:any) {
    return this.httpClient.post(this.apiUrl.apiUrlV3 + this.controller, data);
  }


}