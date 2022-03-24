import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http:HttpClient) { }


  CertificateUpload(formData){
    return this.http.post("http://localhost/Diu.Sac.Cdn/api/Files/SaveCertificateFile",formData,{headers: {'FormType': 'multipart/form-data'}});
  }

  DownloadCertificateFile(formData){
    return this.http.post("http://localhost/Diu.Sac.Cdn/api/Files/DownloadCertificateFile",formData,{ responseType:'blob',headers: {'FormType': 'multipart/form-data'}});

  }
}
