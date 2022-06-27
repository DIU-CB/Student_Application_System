import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerConfig } from '../service.config';

@Injectable({
  providedIn: 'root'
})
export class ApplicationCommentService {

  controller = 'ApplicationComment';
  apiUrl = new ServerConfig().apiUrl;

  constructor(private http:HttpClient) {

   }

   post(formData){
    return this.http.post(this.apiUrl+this.controller,formData,{headers: {'FormType': 'multipart/form-data'}});
   }
   get(ApplicationID){
    return this.http.get(this.apiUrl+this.controller+'/'+ApplicationID);
   }
}
