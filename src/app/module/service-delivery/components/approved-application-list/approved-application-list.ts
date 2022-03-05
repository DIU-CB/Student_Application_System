import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ServiceDeliveryConfigService } from "../../Service/service-delivery-config.service";
import { ServiceDeliveriesWriteService } from "src/app/core/serviceModule/ServiceDeliveries/service-deliveries.wire.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
@Component({
    selector: 'app-approved-application-list',
    templateUrl: './approved-application-list.html',
    styles: [`
        .even-color{background-color:#e7e7e7}
        .button-status{text-align: center; color: #767676; margin-bottom: 10px;}
    `],
    providers: [ServiceDeliveryConfigService]
})
export class ApprovedApplicationListComponent implements OnInit{
    @Input() dataSource;
    @Input() CurrentPage;
    @Output()SourceRefresh = new EventEmitter();
    constructor(
        public serviceDeliveryConf: ServiceDeliveryConfigService,
        public deliverService: ServiceDeliveriesWriteService,
        public notify: PopNotificationService
        ){

        }
    ngOnInit(){
        
    }

    

    Success = (res)=>{
        this.notify.Success("Successfully submited!!!");
        this.SourceRefresh.emit(this.CurrentPage);
    }

    SaveDeliverFromExam(applicationId:string){
        this.deliverService.DeliverFromExam(applicationId, {employeeId: this.serviceDeliveryConf.employeeId})
        .subscribe(this.Success,this.serviceDeliveryConf.Error)
    }
    SaveDeliverFromAccounts(applicationId:string){
        this.deliverService.SaveDeliverFromAccounts(applicationId, {employeeId: this.serviceDeliveryConf.employeeId})
        .subscribe(this.Success,this.serviceDeliveryConf.Error)
    }
    SaveDeliverFromCoordinationOffice(applicationId:string){
        this.deliverService.SaveDeliverFromCoordinationOffice(applicationId, {employeeId: this.serviceDeliveryConf.employeeId})
        .subscribe(this.Success,this.serviceDeliveryConf.Error)
    }
}