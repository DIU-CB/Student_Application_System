import { Component, OnInit } from "@angular/core";
import { ServiceDeliveriesQueryService } from "src/app/core/serviceModule/ServiceDeliveries/approved-applications.query";
import { IXPagination } from "src/app/shared/components/UI-Kit/x-pagination/IxPagination";
import { IServiceDeliverySearch } from "../Entities/SearchParams";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";



@Component({
    selector: 'app-approved-list-page',
    template: `
        <div fxLayout="row" fxLayoutGap="10px" class="layout-gap">
            <div fxFlex="25">
                <h3>Search Options</h3>
                <app-service-delivery-search-form (GetValue)="Search($event)" ></app-service-delivery-search-form>
            </div>
            <div fxFlex="75">
                <circle-loader *ngIf="enableLoader"></circle-loader>
                <app-approved-application-list [dataSource]="approvedList" [CurrentPage]="xPagination?.CurrentPage" (SourceRefresh)="ListRefresh($event)"></app-approved-application-list>
                <app-x-pagination *ngIf="approvedList?.length > 0" [dataSource]="xPagination" (pageSuccess)="Success($event)"></app-x-pagination>
            </div>
        </div>
    `
    , providers: [ServiceDeliveriesQueryService]
})
export class ApprovedListPageComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    enableLoader:boolean = false;
    approvedList;
    xPagination:IXPagination;
    constructor(private applicationService: ServiceDeliveriesQueryService){super()}
    ngOnInit(){
        this.Search({applicationTypeId: "", PageSize: 10, PageNumber: 1})
    }

    async Search(_item:IServiceDeliverySearch){
        // debugger
        this.enableLoader = true;
        this.subscribe$.add(
            this.applicationService.GetXpage(_item)
            .subscribe(this.Success)
        )
        // this.approvedList = res.body;
        // this.xPagination =  JSON.parse(res.headers.get('X-Pagination'));
        // if (this.approvedList) this.enableLoader = false;
    }

    private Success = (res)=>{
        // debugger;
        this.enableLoader = false;
        this.approvedList = res.body;
        this.xPagination =  JSON.parse(res.headers.get('X-Pagination'));
    }

    ListRefresh(event:number){
        this.Search({PageNumber: event, PageSize: 10})
    }
    
}