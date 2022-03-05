import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { ServiceDeliveriesWriteService } from "src/app/core/serviceModule/ServiceDeliveries/service-deliveries.wire.service";
import { TokenService } from "src/app/core/authentication/Services/token.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ServiceDeliveryConfigService{
    employeeId:string;
    constructor(
        private notify: PopNotificationService,
        private deliverService: ServiceDeliveriesWriteService,
        private tokenService: TokenService
        ) {
            this.employeeId = this.tokenService.getUserToken().id;
        }
    Success = (res)=>{
        this.notify.Success()
    }
    Error = (err)=>{
        this.notify.Error(err.error.messages[0]);
    }
    Deliver(applicationId:string, rowVersion: string){
        this.deliverService.Save({
            applicaitonId: applicationId
            , rowVersion: rowVersion
        })
        .subscribe(this.Success,this.Error)
    }

    // SaveDeliverFromExam(applicationId:string){
    //     this.deliverService.DeliverFromExam(applicationId, {employeeId: this.employeeId})
    //     .subscribe(this.Success,this.Error)
    // }
    // SaveDeliverFromAccounts(applicationId:string){
    //     this.deliverService.SaveDeliverFromAccounts(applicationId, {employeeId: this.employeeId})
    //     .subscribe(this.Success,this.Error)
    // }
    // SaveDeliverFromCoordinationOffice(applicationId:string){
    //     this.deliverService.SaveDeliverFromCoordinationOffice(applicationId, {employeeId: this.employeeId})
    //     .subscribe(this.Success,this.Error);
    // }

    
}