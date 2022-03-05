import { Component, OnInit } from "@angular/core";
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
                Process Protocol Edit
            </mat-toolbar-row>
        </mat-toolbar>
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px">
            <app-process-protocol-form></app-process-protocol-form>
        </div>
    </div>
    `
})
export class EditComponent implements OnInit{
    constructor(){}
    ngOnInit(){
    }
}