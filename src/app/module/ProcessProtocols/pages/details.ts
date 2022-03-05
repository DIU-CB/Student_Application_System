import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProcessProtocolsQueryService } from "src/app/core/serviceModule/ProcessProtocols/ProcessProtocols.query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'app-process-protocol-create',
    template: `
    <div fxLayout="column" fxLayoutGap="10px">
        <mat-toolbar class="page-toolbar">  
            <mat-toolbar-row>
                <div class="mat-h4">
                    <a href="#">Dashboard</a> / <a href="#">Application(s)</a>
                </div>
            </mat-toolbar-row>
            <mat-toolbar-row class="page-title">
                Process Protocol Details
            </mat-toolbar-row>
        </mat-toolbar>
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
            <app-process-protocol-details [detailsData]="detailsObject"></app-process-protocol-details>
        </div>
    </div>
    `
})
export class DetailsComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    detailsObject;
    constructor(private route: ActivatedRoute, private processProtService: ProcessProtocolsQueryService){super()}
    ngOnInit(){
        this.subscribe$.add(
            this.route.params.subscribe((res)=>{
                this.subscribe$.add(
                    this.processProtService.GetById(res.id)
                    .subscribe((result)=>{
                        this.detailsObject = result;
                    })
                )
                
            })
        )
    }
}