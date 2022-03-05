import { Injectable } from "@angular/core";
import { IQueryService } from "../service.interface";
import { HttpClient } from "@angular/common/http";
import { ServerConfig } from "../service.config";

@Injectable({
    providedIn: 'root'
  })

export class EmployeesService{
    
    apiUrl = new ServerConfig().apiUrl;
    controller = 'Employees';
    constructor( public httpClient: HttpClient) { }

  
  // To(_id:string){
  //   return this.httpClient.get(this.apiUrl + this.controller + '/to', {params: {name: _id}});
  // }
  // Through(_id:string){
  //   return this.httpClient.get(this.apiUrl + this.controller + '/through', {params: {name: _id}});
  // }
  To(_id:string){
    return this.httpClient.get(this.apiUrl + this.controller, {params: {name: _id}});
  }
  Through(_id:string){
    return this.httpClient.get(this.apiUrl + this.controller, {params: {name: _id}});
  }
  
}