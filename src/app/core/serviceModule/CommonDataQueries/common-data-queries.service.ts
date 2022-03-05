import { Injectable } from "@angular/core";
import { IQueryService } from "../service.interface";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";
import { IStatus } from "src/app/Interface/IStatus";

interface ICommonDataQuerie{
  GetCampus()
  GetFaculty()
  GetRole()
  GetShift()
  GetStatus()
  GetProgram()
}

@Injectable({
    providedIn: 'root'
  })

export class CommonDataQueriesService implements ICommonDataQuerie{

    apiUrl = new ServerConfig().apiUrl;
    controller = 'CommonDataQueries';
    constructor( public httpClient: HttpClient) { }

  getStatus = this.httpClient.get<IStatus>(this.apiUrl + this.controller + '/status');
  getCampus = this.httpClient.get(this.apiUrl + this.controller + '/campus');
  getFaculty = this.httpClient.get(this.apiUrl + this.controller + '/faculty');
  getRole = this.httpClient.get(this.apiUrl + this.controller + '/role');
  getShift = this.httpClient.get(this.apiUrl + this.controller + '/shift');
  getProgram = this.httpClient.get(this.apiUrl + this.controller + '/program');

  GetCampus(){
    return this.getCampus;
  }
  GetFaculty(){
    return this.getFaculty;
  }
  GetRole(){
    return this.getRole;
  }
  GetShift(){
    return this.getShift;
  }
  GetStatus(){
    return this.getStatus;
  }
  GetProgram(){
    return this.getProgram;
  }

}