import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { IQueryService, IWirteService } from "../service.interface";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";


interface IApplicationDispatch{
  Save(data:any)
  Put(data:any, id:string)
  Delete(id:string, toOrThroughId:string)
  SaveChange(data:any, id:string)
}

@Injectable({
    providedIn: 'root'
  })
export class ApplicationDispatchesQueryService implements IQueryService {
 
  
  controller = 'ApplicationDispatches';
  apiUrl = new ServerConfig().apiUrl;
  cacheUrl = new ServerConfig().cacheUrl;

  constructor( private httpClient: HttpClient ) { }

  Get(_params?:any):any{
    return this.httpClient .get(this.apiUrl + this.controller, {params: _params});
  }
  
  GetById(id:string):any{
    // return this.httpClient .get(this.apiUrl + this.controller + '/' + id);
    return this.httpClient.get(`${this.cacheUrl}Caches`, {params: {Key: id, Prefix: 'student-application' }})
  }

  GetXpaging(_params?:any):any{
    return this.httpClient.get<HttpResponse<Object>>(this.apiUrl + this.controller
      , { observe: 'response', params: _params }).pipe(
      tap(resp => {
        return resp;
      })
    );
  }

}