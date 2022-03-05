import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class ApplicationCounterQueryService {
  
  controller = 'ApplicationCounter';
  apiUrl = new ServerConfig().apiUrl;
  cacheUrl = new ServerConfig().cacheUrl;

  constructor( private httpClient: HttpClient ) { }
  
  Count():any{
    return this.httpClient .get(this.apiUrl + this.controller + "/total");
  }  
  CountPendingForAuthority():any{
    return this.httpClient .get(this.apiUrl + "ApplicationProceedings?applicationStatusId=6");
  }

}