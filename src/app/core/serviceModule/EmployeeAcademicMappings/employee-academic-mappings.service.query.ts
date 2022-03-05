import { ServerConfig } from "../service.config";
import { IQueryService } from "../service.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class EmployeeAcademicMappingsQueryService implements IQueryService{

    apiUrl = new ServerConfig().apiUrl;
    controller = 'EmployeeAcademicMappingQueries';
    constructor( public httpClient: HttpClient) { }

  Get(){
    return this.httpClient.get(this.apiUrl + this.controller);
  }

  GetById(id?:string){
    return this.httpClient.get(this.apiUrl + this.controller + '/' + id);
    // return this.httpClient.get(`${this.cacheUrl}Caches`, {params: {Key: id, Prefix: 'student-application' }});
  }
}