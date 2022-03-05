
import { Injectable } from '@angular/core';
import { ServerConfig } from '../service.config';
import { HttpClient } from '@angular/common/http';
import { IQueryService } from '../service.interface';



@Injectable()
export class ApplicationTypeQueryService implements IQueryService {
  
  controller = 'ApplicationTypeQueries';
  apiUrl = new ServerConfig().apiUrl;
  cacheUrl = new ServerConfig().cacheUrl;

  constructor( private httpClient: HttpClient ) { }
  getApplicationTypes = this.httpClient .get(this.apiUrl + this.controller)
  Get(_params?:any){
    return this.httpClient .get(this.apiUrl + this.controller, {params: _params})
  }
  
  GetById(_id?:string){
    return this.httpClient .get(this.apiUrl + this.controller + '/' + _id )
    //return this.httpClient.get(`${this.cacheUrl}Caches`, {params: {Key: _id, Prefix: 'student-application' }});
  }


}