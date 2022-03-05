import { Component, OnInit } from "@angular/core";
@Component({
    selector: 'app-employee-mapping-list',
    template: `

    <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Application</a>
                    </div>
                    </mat-toolbar-row>
                    <mat-toolbar-row class="page-title">
                        List of Employee Academic Mapping(s)
                    </mat-toolbar-row>
            </mat-toolbar>
        <div class="layout-gap">
            <employee-academic-mapping-list></employee-academic-mapping-list>
            <a mat-mini-fab routerLink="/dashboard/settings/employee-map-create" class="ui-float-button">
                <mat-icon aria-label="Example icon-button with a heart icon">add</mat-icon>
            </a>
        </div>
    `
})
export class EmployeeMappingsListComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}