import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationPaymentServiceService {

  constructor(private http:HttpClient) { }

  RequestPayment(PaymentBody){
    console.log(PaymentBody);
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post('http://203.190.9.108/api.diu.sac.payment/PaymentFromFront',PaymentBody);

    
  }
}
