import { Component, Input, OnInit, SimpleChange } from "@angular/core";

@Component({
    selector: 'circle-loader',
    template: `
        <mat-spinner *ngIf="!disbleLoader
        " diameter="{{diameter}}" [color]="color"></mat-spinner>
        <div>{{loadingStatus}}</div>
    `
})

export class CircleLoader implements OnInit{
    loadingStatus:string = 'Loading...';
    color:string = 'primary'; 
    disbleLoader:boolean = false;
    @Input()diameter:number = 50;
    ngOnInit(){
        setTimeout(()=>{
            this.loadingStatus = 'Still loading...';
            this.color = 'warn';
        }, 5000)

        setTimeout(()=>{
            this.loadingStatus = 'Just a few more time... We are collecting data.';
            this.color = 'accent';
        }, 10000)

        setTimeout(()=>{
            this.loadingStatus = 'Thank you for patience :) it\'s still loading...';// 'Sorry.. load failed. Reaload Browser';
            this.color = 'primary';
        }, 15000)

        setTimeout(()=>{
            this.loadingStatus = 'Taking too much time to collecting data. You can reload browser or contact with server administrator.';
            this.color = 'warn';
        }, 30000)
    }
}