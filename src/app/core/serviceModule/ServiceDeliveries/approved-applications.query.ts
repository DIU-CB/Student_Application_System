import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable()

export class ServiceDeliveriesQueryService{

    apiUrl = new ServerConfig().apiUrl;
    controller = 'ServiceDeliveries';
    constructor( public httpClient: HttpClient) { }

    Get(params?:any){
        return this.httpClient.get(this.apiUrl + this.controller, {params: params});
    }
    GetXpage(_params?:any){
        return this.httpClient.get<HttpResponse<Object>>(this.apiUrl + this.controller
            , { observe: 'response', params: _params }).pipe(
            tap(resp => {
              return resp;
            })
          );
    }

}