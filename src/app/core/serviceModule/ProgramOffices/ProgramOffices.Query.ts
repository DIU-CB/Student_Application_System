import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class ProgramOfficesQueryService {
  
  controller = 'ProgramOffices';
  apiUrl = new ServerConfig().apiUrl;

  constructor( private httpClient: HttpClient ) { }

  Get():any{
    return this.httpClient .get(`${this.apiUrl}${this.controller}`);
  }


}