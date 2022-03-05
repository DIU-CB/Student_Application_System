import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class MentorsQueryService{

    apiUrl = new ServerConfig().apiUrl;
    controller = 'Mentors';
    constructor( public httpClient: HttpClient) { }

    Get(params?:any){
        return this.httpClient.get(this.apiUrl + this.controller, {params: params});
    }

}