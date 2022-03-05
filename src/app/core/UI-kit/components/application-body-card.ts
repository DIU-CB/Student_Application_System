import { Component, OnInit, Input } from "@angular/core";
@Component({
    selector: 'app-application-body-card',
    template: `
        <mat-card class="info-card">
            <!--<mat-card-header>
                <mat-card-title>Body</mat-card-title>
            </mat-card-header>-->
            <mat-card-content>
                <textarea matInput value="{{bodyData}}" matTextareaAutosize readonly="true"></textarea>
            </mat-card-content>
        </mat-card>
    `
})
export class ApplicationBodyCardComponent implements OnInit{
    @Input()bodyData:string;
    constructor(){}
    ngOnInit(){
    }
}