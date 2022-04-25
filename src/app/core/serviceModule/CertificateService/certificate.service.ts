import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http:HttpClient) { }


  CertificateUpload(formData){
    return this.http.post("http://203.190.9.108/api.diu.sac.cdn/api/Files/SaveCertificateFile",formData,{headers: {'FormType': 'multipart/form-data'}});
  }

  DownloadCertificateFile(formData){
    return this.http.post("http://203.190.9.108/api.diu.sac.cdn/api/Files/DownloadCertificateFile",formData,{ responseType:'blob',headers: {'FormType': 'multipart/form-data'}});

  }

  DownloadDateForCertificate(formData){
    return this.http.post("http://203.190.9.108/api.diu.sac.cdn/api/Files/SetCertificateFileDownloadDate",formData,{ responseType:'blob',headers: {'FormType': 'multipart/form-data'}});

  }
}
