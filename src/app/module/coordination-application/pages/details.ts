import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentDueAndCgpaSummariesQueryService } from "src/app/core/serviceModule/StudentDueAndCgpaSummaries/student-due-and-cgpa-summaries.query.service";
import { ApplicationQueryService } from "src/app/core/serviceModule/ApplicationQueries/ApplicationQueries.service";
import { PrintService } from "src/app/shared/Print/print.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { StudentApplicationFormComponent } from "../../student-application/components/student-application-form/student-application-form.component";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { CertificateService } from "src/app/core/serviceModule/CertificateService/certificate.service";
@Component({
    selector: 'app-details',
    providers: [PrintService],
    template: `<div>

                    <mat-toolbar class="page-toolbar">  
                        <mat-toolbar-row>
                            <div class="mat-h4">
                                <a href="#">Dashboard</a> / <a href="#">Application</a>
                            </div>
                        </mat-toolbar-row>
                        <mat-toolbar-row class="page-title">
                        Application Details
                        </mat-toolbar-row>
                    </mat-toolbar>
                    
                    <div id="adPrint" class="layout-gap">
                        <app-application-details [dataSource]="data"></app-application-details>
                    </div>

                    <label><b>Certificate Upload</b></label><br>
                    <input mat-stroked-button type="file" name="files" accept="application/pdf" color="accent" (change)="CertificateUpload($event)" />
                    
                    <button mat-mini-fab (click)="print.printElem('adPrint')" class="ui-float-button">
                        <mat-icon aria-label="Example icon-button with a heart icon">print</mat-icon>
                    </button>
                </div>`
})
export class DetailsComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    data:any;
    
    // paymentData:any;
    constructor(
        private applicationService: ApplicationQueryService
        , private route: ActivatedRoute
        // , private paymentService: StudentDueAndCgpaSummariesQueryService
        , public print: PrintService
        ,private notify:PopNotificationService
        ,private certificateService:CertificateService
        ){super()}
    ngOnInit(){
        this.subscribe$.add(
            this.route.params.subscribe((prm)=>{
                this.subscribe$.add(
                    this.applicationService.GetById(prm.id)
                        .subscribe((resp)=>{
                            let res = JSON.parse(resp.jsonData);
                            this.data = res;
                            // this.paymentService.GetDue(res.studentId)
                            //     .subscribe(paymentResp => {
                            //         this.paymentData = paymentResp
                            //     })
                        })
                )
            })
        )
    }

    ProcessFile(event){
        let fileList:FileList = event.target.files;
        var promise =new Promise((resolve,reject)=>{
            if(fileList.length>0){
              let  file:File =fileList[0];
              if(file.size>512000){
                  reject(new Error("File size is greater then 500kB"))
              }

              var reader= new FileReader();
              reader.onload=()=>{
                resolve(reader.result);
              }
              reader.readAsDataURL(file);
            }

            
        });
        return promise;
    }

    CertificateUpload(event){
        this.ProcessFile(event)
        .then(
            (res)=>{
                let fileList:FileList = event.target.files;
               console.log(fileList.item(0));
                const formData= new FormData();

                formData.append('ApplicationId',this.data.id);
                formData.append('StudentId',this.data.studentId);
                formData.append('file',fileList.item(0),fileList.item(0).name);

                 this.certificateService.CertificateUpload(formData).subscribe(
                    (res)=>{

                        this.notify.Success("Successfully Saved Certificate");

                    },
                    (err)=>{
                        this.notify.Error("Error in Saving Certificate");

                    }
                 );
                
                
            }
            , (err)=>{
                this.notify.Error(err.message);
            }
        );
    }
}