import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";

@Injectable()
export class DuesQueryService{

    apiUrl = new ServerConfig().apiUrl;
    controller = 'Dues';
    constructor( public httpClient: HttpClient) { }

  Get(_params?){
    return this.httpClient.get(this.apiUrl + this.controller, {params: _params});
  }

}