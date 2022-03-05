import { Component, OnInit } from "@angular/core";
@Component({
    selector: 'app-forward',
    template: `<div>
    <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Application</a>
                    </div>
                    </mat-toolbar-row>
                    <mat-toolbar-row class="page-title">
                        Proceed Application
                    </mat-toolbar-row>
            </mat-toolbar>
            <div class="layout-gap">
                <app-authority-application-proceed-form class="layout-gap"></app-authority-application-proceed-form>
                <a mat-mini-fab routerLink="/dashboard/authority-application/list" class="ui-float-button">
                    <mat-icon aria-label="Example icon-button with a heart icon">list</mat-icon>
                </a>
            </div>
                
            </div>`
})
export class ProceedComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}