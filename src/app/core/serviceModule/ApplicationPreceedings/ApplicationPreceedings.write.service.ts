import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { IWirteService } from "../service.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ApplicationPreceedingsWriteService implements IWirteService{
  apiUrl = new ServerConfig().apiUrl;
  controller = 'ApplicationProceedings';
  constructor( private httpClient: HttpClient) { }

  Save(data:any) {
    return this.httpClient.post(this.apiUrl + this.controller, data);
  }


}