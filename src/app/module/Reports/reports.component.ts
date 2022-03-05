import { OnInit, Component } from "@angular/core";

@Component({
    selector: 'app-report-base',
    template: `
        
        <mat-toolbar class="page-toolbar">  
            <mat-toolbar-row>
                <div class="mat-h4">
                    <a href="#">Dashboard</a> / <a href="#">Delevery</a>
                </div>
            </mat-toolbar-row>
            <mat-toolbar-row class="page-title">
                Reports
            </mat-toolbar-row>
        </mat-toolbar>
        
        <div class="layout-gap">
            <router-outlet></router-outlet>
        </div>

    `
})
export class ReportComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}