import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { PrintService } from "src/app/shared/Print/print.service";
import { ApplicationQueryService } from "src/app/core/serviceModule/ApplicationQueries/ApplicationQueries.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { ApplicationPaymentServiceService } from "src/app/core/serviceModule/ApplicationPaymentSrvice/application-payment-service.service";


@Component({
  selector: 'app-student-application-payment',
  template: `
        <div>
            <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Student Application</a>
                    </div>
                </mat-toolbar-row>
                <mat-toolbar-row class="page-title">
                    Application Edit
                </mat-toolbar-row>
            </mat-toolbar>

            <div id="adPrint">
                <app-application-details [dataSource]="data"></app-application-details>
            </div>
            <button mat-stroked-button color="accent" (click)="OnApplicationPayment()">Payment</button>
              
           
            <button mat-mini-fab (click)="print.printElem('adPrint')" class="ui-float-button">
                <mat-icon aria-label="Example icon-button with a heart icon">print</mat-icon>
            </button>
        </div>
    `
  , providers: [PrintService, StudentApplicationQueryService]
})
export class StudentApplicationPaymentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  data: any;
  PaymentBody;
  PaymentURL:string=null;
  // paymentData:any;
  constructor(
    private applicationService: ApplicationQueryService
    , private route: ActivatedRoute
    // , private paymentService: StudentDueAndCgpaSummariesQueryService
    , public print: PrintService
    , private paymentService:ApplicationPaymentServiceService
  ) {
    super()

  }

  ngOnInit() {
    this.subscribe$.add(
      this.route.params.subscribe((prm) => {
        this.subscribe$.add(
          this.applicationService.GetById(prm.id)
            .subscribe((resp) => {
              let res = JSON.parse(resp.jsonData);
              this.data = res;
              this.SetPaymentBody(prm.amount);
              //console.log(this.data);
            })
        )
      })
    )
  }

  SetPaymentBody(amount) {
    this.PaymentBody = {
      user_id: this.data.studentId,
      amount: parseFloat(amount),
      currency_code: "BDT",
      cus_name: this.data.student.name,
      cus_email: this.data.student.email,
      cus_address: "",
      cus_city: "",
      cus_state: "",
      cus_postcode: "",
      cus_country: "",
      cus_phone: this.data.student.mobile,
      response_type: "json",
      success: "http://203.190.9.108/api.diu.sac.payment/api/PaymentPush",
      redirect: "http://203.190.9.108/diu-sac/dashboard/student-application/list",
      reff_id: this.data.studentId + "." + this.data.id + "." + Date.now()
    }
    //console.log(this.PaymentBody);

  }

  OnApplicationPayment(){
    this.paymentService.RequestPayment(this.PaymentBody)
    .subscribe(
      (res:any)=>{
        this.PaymentURL=JSON.parse(res).url;
        window.location.href = `${this.PaymentURL}`;
        
      },
      (err)=>{
        
        console.log(err);
      }
      );
  }



}
