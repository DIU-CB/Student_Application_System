import { Component, OnInit, Input } from "@angular/core";
import { ServiceDeliveryConfigService } from "../../Service/service-delivery-config.service";
@Component({
    selector: 'app-approved-application-details',
    templateUrl: './approved-application-details.html'
})
export class ApprovedApplicationDetailsComponent implements OnInit{
    @Input() dataSource;
    @Input() paymentDataSource;
    constructor(public serviceDeliveryConf: ServiceDeliveryConfigService){}
    ngOnInit(){

    }

    FilterApplicationConcern(items: any[], typeId){
        if (!items || !typeId) {
            return items;
        }
        return items.filter(item => item.applicationConcernType.id === typeId);
    }
}