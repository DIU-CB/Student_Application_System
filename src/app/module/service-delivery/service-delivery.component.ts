import { Component, OnInit } from "@angular/core";
@Component({
    selector: 'app-setting-component',
    template: `
    <mat-toolbar class="page-toolbar">
        Service Delivery
    </mat-toolbar>
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})
export class ServiceDeliveryComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}