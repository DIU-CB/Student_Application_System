import { Component, OnInit } from "@angular/core";
import { ApplicationQueryService } from "src/app/core/serviceModule/ApplicationQueries/ApplicationQueries.service";
import { ActivatedRoute } from "@angular/router";
import { StudentDueAndCgpaSummariesQueryService } from "src/app/core/serviceModule/StudentDueAndCgpaSummaries/student-due-and-cgpa-summaries.query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'app-approved-details-page',
    template: `
        <app-approved-application-details
         [dataSource]="approvedAppDetails"
         [paymentDataSource]="paymentData"
         ></app-approved-application-details>

         <a mat-mini-fab routerLink="/dashboard/service-delivery/approved-application-list" class="ui-float-button">
            <mat-icon aria-label="Example icon-button with a heart icon">list</mat-icon>
        </a>
    `
    , providers: [ApplicationQueryService]
})
export class ApprovedApplicationDetailsPageComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    constructor(
        private applicationService: ApplicationQueryService
        , private route: ActivatedRoute
        , private paymentService: StudentDueAndCgpaSummariesQueryService
        ){super()}
    approvedAppDetails;
    paymentData;
    ngOnInit(){
        this.subscribe$.add(
            this.route.params.subscribe((prm)=>{
                this.subscribe$.add(
                    this.applicationService.GetById(prm.id)
                    .subscribe((resp)=>{
                        let res = JSON.parse(resp.jsonData);
                        //console.log('asdfasdfasdfa ', res)
                        this.approvedAppDetails = res;
                        this.subscribe$.add(
                            this.paymentService.GetDue(res.studentId)
                                .subscribe(paymentResp => {
                                    this.paymentData = paymentResp
                                })
                        )
                    })
                )
            })
        )
        
    }
}