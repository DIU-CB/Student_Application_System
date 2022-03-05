import { Component, OnInit, Input } from "@angular/core";
// import { ServiceDeliveryConfigService } from "../../Service/service-delivery-config.service";
@Component({
    selector: 'app-application-details',
    templateUrl: './application-details.component.html',
    styles: [`
        .example-full-width {
            width: 100%;
        }
    `]
})
export class ApplicationDetailsComponent implements OnInit{
    @Input() dataSource;
    // @Input() paymentDataSource;
    constructor(
        // public serviceDeliveryConf: ServiceDeliveryConfigService
        ){ }
    ngOnInit(){ }
}