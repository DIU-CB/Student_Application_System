import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IWirteService } from "../service.interface";
import { ServerConfig } from "../service.config";


@Injectable({
    providedIn: 'root'
})

export class StudentApplicationWriteService implements IWirteService{
  apiUrl = new ServerConfig().apiUrl;
  controller = 'StudentApplications';
  constructor( private httpClient: HttpClient) { }

  Save(data:any) {
    return this.httpClient.post(this.apiUrl + this.controller, data);
  }
  Put(body:any, id:string) {
    return this.httpClient.put(this.apiUrl + this.controller + '/' + id, body);
  }
  Delete(id:string) {
    return this.httpClient.delete(this.apiUrl + this.controller + '/' + id);
  }
  DeleteFile(id:string, fileName:string) {
    return this.httpClient.delete(this.apiUrl + this.controller + '/' + id + '/file/' + fileName);
  }

  SaveChanges(body:any, id?:string){
    if (id) {
      return this.Put(body, id);
    } else {
      return this.Save(body);
    }
  }

}