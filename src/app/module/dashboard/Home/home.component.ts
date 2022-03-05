import { Component, OnInit } from "@angular/core";
import { ApplicationDispatchesQueryService } from "src/app/core/serviceModule/ApplicationDispatches/ApplicationDispatches.Query.service";
import { AuthorizationService } from "src/app/core/authentication/Services/authorization.service";
import { ApplicationCounterQueryService } from "src/app/core/serviceModule/ApplicationCounter/ApplicationCounter.query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { Observable } from "rxjs";
@Component({
    selector: 'app-dashboard-home',
    templateUrl: './home.component.html',
    providers: [ApplicationCounterQueryService]
})
export class HomeComponent implements OnInit{
    totalStudentApplication:number = 0;
    // totalStudentApplication2:number = 0;
    totalStudentApplication2:Observable<any>;

    interValTime:number = 1000 * 60 * 5;//5 Minute
    constructor(
        private applicationCounterService: ApplicationCounterQueryService
        , public auth: AuthorizationService){}
    ngOnInit(){
        this.totalStudentApplication = this.applicationCounterService.Count()
        this.totalStudentApplication2 = this.applicationCounterService.CountPendingForAuthority();
        // this.GetTotalApplication()
        // this.GetTotalPendingApplicationForCoordination();
        // setInterval(()=>{
        //     this.GetTotalApplication()
        // }, this.interValTime)
    }

    // GetTotalApplication(){
    //     this.totalStudentApplication = this.applicationCounterService.Count()
    // }
    // GetTotalPendingApplicationForCoordination(){
    //     this.totalStudentApplication2 = this.applicationCounterService.CountPendingForAuthority();
    //         // .subscribe(res=>{
    //         //     this.totalStudentApplication2 = res.length;
    //         // })
    // }
}