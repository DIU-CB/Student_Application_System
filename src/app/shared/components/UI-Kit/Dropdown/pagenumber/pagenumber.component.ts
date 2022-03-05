import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
    selector: 'app-pagenumber-dropdown',
    template: `
    <mat-form-field>
    {{dropModel}}
        <mat-select placeholder="Page Size" [(ngModel)]="dropModel">
            <mat-option *ngFor="let page of pageNumbers" [value]="page">
            {{page}}
            </mat-option>
        </mat-select>
    </mat-form-field>
    `
})
export class PagenumberDropdownComponent implements OnInit{
    pageNumbers:string[] = [
        "5", "10", "20", "50", "100"
    ]
    @Input()dropModel: string;
    constructor(){}
    ngOnInit(){
    }
}