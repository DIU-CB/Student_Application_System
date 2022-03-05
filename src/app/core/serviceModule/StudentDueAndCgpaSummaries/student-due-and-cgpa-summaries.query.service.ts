import { Injectable } from "@angular/core";
import { IQueryService } from "../service.interface";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class StudentDueAndCgpaSummariesQueryService{

    apiUrl = new ServerConfig().apiUrl;
    controller = 'StudentDueAndCgpaSummaries';
    constructor( public httpClient: HttpClient) { }

    GetById(_id:string){
        return this.httpClient.get(this.apiUrl + this.controller + '/' + _id);
    }

    GetDue(_id:string){
        return this.httpClient.get(this.apiUrl + this.controller + '/due/' + _id);
    }

    GetCgpa(_id:string){
        return this.httpClient.get(this.apiUrl + this.controller + '/cgpa/' + _id);
    }
  
}