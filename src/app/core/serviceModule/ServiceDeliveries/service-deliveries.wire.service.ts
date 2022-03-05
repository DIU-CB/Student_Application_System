import { IWirteService } from "../service.interface";
import { Injectable } from "@angular/core";
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";
import { IDeleverDecision, IDelever } from "src/app/module/service-delivery/Entities/DeliverDecision";

@Injectable({
    providedIn: 'root'
})

export class ServiceDeliveriesWriteService implements IWirteService{
  apiUrl = new ServerConfig().apiUrl;
  controller = 'ServiceDeliveries';
  constructor(private httpClient: HttpClient) { }

  Save(data:IDelever) {
    return this.httpClient.post(this.apiUrl + this.controller, data);
  }
  
  private DeliverDecision(method:string, id:string, value:any) {
    return this.httpClient.put(`${this.apiUrl}${this.controller}/${method}/${id}`, value);
  }

  DeliverFromExam(id:string, value:IDeleverDecision) {
    return  this.DeliverDecision('DeliverFromExam', id, value);
  }
  SaveDeliverFromAccounts(id:string, value:IDeleverDecision) {
    return  this.DeliverDecision('DeliverFromAccounts', id, value);
  }
  SaveDeliverFromCoordinationOffice(id:string, value:IDeleverDecision) {
    return  this.DeliverDecision('DeliverFromCoordinationOffice', id, value);
  }

}