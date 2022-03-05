import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";
import { IQueryService } from "../service.interface";

export interface IFiles {
    Get(applicationId: string, studentId: string);
}

@Injectable({
    providedIn: 'root'
  })

export class FileQueryService implements IFiles{

    apiUrl = new ServerConfig().CdnUrl;
    controller = 'StudentApplicationQueries';
    constructor( public httpClient: HttpClient) { }

    Get(applicationId:string, studentId:string){
        return this.httpClient.get( this.apiUrl + 'files/', {params: {ApplicationId: applicationId, StudentId: studentId, }});
  }
}