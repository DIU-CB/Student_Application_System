import { Injectable } from "@angular/core";
import { IQueryService } from "../service.interface";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface IApplicationQuery extends IQueryService {
  GetByStudentId(id:string)
}

@Injectable({
    providedIn: 'root'
  })
export class StudentCommitmentsQueryService implements IApplicationQuery {
  
  controller = 'StudentCommitments';
  apiUrl = new ServerConfig().apiUrl;
  cacheUrl = new ServerConfig().cacheUrl;

  constructor( private httpClient: HttpClient ) { }

  Get(_params?:any):any{
    return this.httpClient .get(this.apiUrl + this.controller, {params: _params});
  }
  
  GetByStudentId(id:string):any{
    return this.httpClient.get(this.apiUrl + this.controller + '/' + id);
  }
  GetByApplicationId(id:string):Observable<any>{
    return this.httpClient.get(this.apiUrl + this.controller + '/app/' + id);
  }
  
  GetReportByProgramAndSemisterId(searchParams){
    return this.httpClient.get(`${this.apiUrl}${this.controller}/report`, {params: searchParams});
  }

}