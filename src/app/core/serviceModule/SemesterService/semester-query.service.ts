import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
export class SemesterQueryService {
  
  controller = 'semesters';
  apiUrl = new ServerConfig().apiUrl;

  constructor( private httpClient: HttpClient ) { }
  
  getSemester = this.httpClient.get(this.apiUrl + this.controller);

  Get(_params?:any):any{
    return this.httpClient.get(this.apiUrl + this.controller, {params: _params});
  }

  GetAutocomplete(_params?:any):any{
    return this.httpClient.get(this.apiUrl + this.controller + "/" + _params);
  }

  Save(_data){
    return this.httpClient.post(this.apiUrl + this.controller, _data);
  }
  

}