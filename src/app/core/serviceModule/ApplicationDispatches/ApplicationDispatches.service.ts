import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { IQueryService, IWirteService } from "../service.interface";
import { HttpClient } from "@angular/common/http";

interface IApplicationDispatch{
  Save(data:any)
  Put(data:any, id:string)
  Delete(id:string, toOrThroughId:string)
  SaveChange(data:any, id:string)
}

@Injectable({
    providedIn: 'root'
  })
export class ApplicationDispatchesService implements IApplicationDispatch {
 
  
  controller = 'ApplicationDispatches';
  apiUrl = new ServerConfig().apiUrl;

  constructor( private httpClient: HttpClient ) { }
  
  Save(data:any) {
    return this.httpClient.post(this.apiUrl + this.controller, data);
  }

  Put(data:any, id:string) {
    return this.httpClient.put(this.apiUrl + this.controller + '/' + id, data);
  }

  Delete(id:string, toOrThroughId:string) {
    return this.httpClient.delete(this.apiUrl + this.controller + '/' + id + '/toOrThrough/' + toOrThroughId);
  }

  SaveChange(data:any, id:string){
    if (id) {
      return this.Put(data, id);
    } else {
      return this.Save(data);
    }
  }

}