import { Injectable } from '@angular/core';
import { ServerConfig } from "../service.config";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ApplicationConcernsUpdateService {

  controller = 'ApplicationDispatches';
  apiUrl = new ServerConfig().apiUrl;
  jsonUrl="http://203.190.9.108/api.diu.sac.com.json/api/caches/selected"
  constructor(private httpClient: HttpClient ) { }

  updateConcern(applicationId:string,orderNo:Number,newConcrnId:string){
    var body={
      ApplicationId:applicationId,
      OrderNo:orderNo,
      ConcernedEmployeeId:newConcrnId   
    };
    
    // this.httpClient.post(this.jsonUrl,applicationId);
    // http://localhost:4956/api/ApplicationDispatches?applicationId=637579597241822664&applicationOrderNo=4&newConcernId=710002613
    
    return this.httpClient.put(this.apiUrl+this.controller,body);
  
  }

  updateJsonForUpdateConcern(applicationId:string)
  {
    var body=[
      applicationId
    ]
    // console.log(body);
    
    return this.httpClient.put('http://203.190.9.108/api.diu.sac.com.json/api/caches/selected',body);
  }
}
