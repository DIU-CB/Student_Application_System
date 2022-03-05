import { Injectable } from "@angular/core";
import { IQueryService } from "../service.interface";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface IApplicationQuery extends IQueryService {
  GetById(id:string)
}

@Injectable({
    providedIn: 'root'
  })
export class ApplicationQueryService implements IApplicationQuery {
  
  controller = 'ApplicationQueries';
  apiUrl = new ServerConfig().apiUrl;
  cacheUrl = new ServerConfig().cacheUrl;

  constructor( private httpClient: HttpClient ) { }

  Get(_params?:any):any{
    return this.httpClient .get(this.apiUrl + this.controller, {params: _params});
  }
  
  GetById(id:string):any{
    // return this.httpClient .get(this.apiUrl + this.controller + '/' + id);
    return this.httpClient.get(`${this.cacheUrl}Caches`, {params: {Key: id, Prefix: 'student-application' }});
  }

}