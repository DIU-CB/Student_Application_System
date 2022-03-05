import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class ProcessProtocolsQueryService {
  
  controller = 'ProcessProtocols';
  apiUrl = new ServerConfig().apiUrl;
  cacheUrl = new ServerConfig().cacheUrl;

  constructor( private httpClient: HttpClient ) { }

  Get(_items?:any):any{
    return this.httpClient .get(this.apiUrl + this.controller, {params: _items});
  }

  GetById(id:string):any{
    return this.httpClient .get(this.apiUrl + this.controller + '/' + id);
  }

}