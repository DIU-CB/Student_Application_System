import { Component, OnInit } from "@angular/core";
@Component({
    selector: 'app-type-list',
    template: `
    <mat-toolbar class="page-toolbar">  
    <mat-toolbar-row>
        <div class="mat-h4">
            <a href="#">Dashboard</a> / <a href="#">Application</a>
        </div>
        </mat-toolbar-row>
        <mat-toolbar-row class="page-title">
            List of Application Type(s)
        </mat-toolbar-row>
</mat-toolbar>
    <div class="layout-gap">
        <app-application-type-list></app-application-type-list>
        <a mat-mini-fab routerLink="/dashboard/settings/app-type-create" class="ui-float-button">
            <mat-icon aria-label="Example icon-button with a heart icon">add</mat-icon>
        </a>
    </div>
    `
})
export class AppTypeListComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}