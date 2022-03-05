import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { IQueryService } from "../service.interface";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class ApplicationPreceedingsQueryService implements IQueryService{
  apiUrl = new ServerConfig().apiUrl;
  controller = 'ApplicationProceedings';
  constructor( private httpClient: HttpClient) { }

  Get(data?:any) {
    return this.httpClient.get(this.apiUrl + this.controller, {params: data});
  }

  GetXpaging(_params?:any):any{
    return this.httpClient.get<HttpResponse<Object>>(this.apiUrl + this.controller
      , { observe: 'response', params: _params }).pipe(
      tap(resp => {
        return resp;
      })
    );
  }
  GetPendingWithXPaging(_params?:any):any{
    return this.httpClient.get<HttpResponse<Object>>(this.apiUrl + this.controller + "/actual"
      , { observe: 'response', params: _params }).pipe(
      tap(resp => {
        return resp;
      })
    );
  }


}