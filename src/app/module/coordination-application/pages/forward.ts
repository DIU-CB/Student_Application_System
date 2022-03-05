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
                        Dispatch Application
                    </mat-toolbar-row>
            </mat-toolbar>
                    <app-coordination-application-forward-form></app-coordination-application-forward-form>
                    <a mat-mini-fab routerLink="/dashboard/coordination-application/list" class="ui-float-button">
                        <mat-icon aria-label="Example icon-button with a heart icon">list</mat-icon>
                    </a>
                </div>`
})
export class ForwardComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}