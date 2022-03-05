import { Component, OnInit } from "@angular/core";
@Component({
    selector: 'app-type-etit',
    template: `

    <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Application</a>
                    </div>
                    </mat-toolbar-row>
                    <mat-toolbar-row class="page-title">
                        Edit Application Type
                    </mat-toolbar-row>
            </mat-toolbar>

        <app-application-types-form></app-application-types-form>
        <a mat-mini-fab routerLink="/dashboard/settings/app-type-list" class="ui-float-button">
            <mat-icon aria-label="Example icon-button with a heart icon">list</mat-icon>
        </a>
    `
})
export class AppTypeEditComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}