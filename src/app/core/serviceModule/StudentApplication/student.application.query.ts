import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerConfig } from "../service.config";
import { IQueryService } from "../service.interface";
import { FileQueryService } from "../Files/files.query";

export interface IStudentQuery extends IQueryService {
  GetById(id:string)
  GetFiles(applicationId:string, studentId:string);
}

@Injectable({
    providedIn: 'root'
  })

export class StudentApplicationQueryService implements IStudentQuery{

    apiUrl = new ServerConfig().apiUrl;
    cacheUrl = new ServerConfig().cacheUrl;
    controller = 'StudentApplications';
    constructor( public httpClient: HttpClient, public fileService: FileQueryService) { }

  Get(){
    return this.httpClient.get(this.apiUrl + this.controller);
  }
  //http://203.190.9.108/api.diu.cache.com/api/Caches?Key=636853056618338084&Prefix=student-application
  GetById(_id:string){
    return this.httpClient.get(`${this.apiUrl}${this.controller}/${_id}`);
    // return this.httpClient.get(`${this.cacheUrl}Caches`, {params: {Key: _id, Prefix: 'student-application' }});
  }
  GetFiles(applicationId:string, studentId:string){
    return this.fileService.Get(applicationId, studentId);
    // return this.httpClient.get('http://192.168.10.124/api.diu.sac.cdn/api/files/', {params: {}});
  }
}