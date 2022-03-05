import { Component, OnInit } from "@angular/core";
@Component({
    selector: 'app-employee-mapping-create',
    template: `

    <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Application</a>
                    </div>
                    </mat-toolbar-row>
                    <mat-toolbar-row class="page-title">
                        Create Employee Academic Mapping
                    </mat-toolbar-row>
            </mat-toolbar>

    <employee-academic-mapping-form></employee-academic-mapping-form>
    <a mat-mini-fab routerLink="/dashboard/settings/employee-map-list" class="ui-float-button">
        <mat-icon aria-label="Example icon-button with a heart icon">list</mat-icon>
    </a>
    `
})
export class EmployeeMappingsCreateComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}