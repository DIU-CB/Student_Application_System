import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { PrintService } from "src/app/shared/Print/print.service";
import { ApplicationQueryService } from "src/app/core/serviceModule/ApplicationQueries/ApplicationQueries.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";


@Component({
    selector: 'app-student-application-print',
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

            <button mat-mini-fab (click)="print.printElem('adPrint')" class="ui-float-button">
                <mat-icon aria-label="Example icon-button with a heart icon">print</mat-icon>
            </button>
        </div>
    `
    , providers: [PrintService, StudentApplicationQueryService]
  })

  
  export class StudentApplicationPrintComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
    data:any;
    // paymentData:any;
    constructor(
        private applicationService: ApplicationQueryService
        , private route: ActivatedRoute
        // , private paymentService: StudentDueAndCgpaSummariesQueryService
        , public print: PrintService
        ){ super()}
    ngOnInit(){
        this.subscribe$.add(
            this.route.params.subscribe((prm)=>{
                this.subscribe$.add(
                    this.applicationService.GetById(prm.id)
                    .subscribe((resp)=>{
                        let res = JSON.parse(resp.jsonData);
                        this.data = res;
                        console.log(this.data);
                    })
                )
            })
        )
    }
  
  }
  