import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TokenService } from "../../authentication/Services/token.service";
import { ProgramOfficesQueryService } from "../../serviceModule/ProgramOffices/ProgramOffices.Query";
@Component({
    selector: 'app-through-single-form',
    styles: [
        `.input-full-width{width: 100%;}`
    ],
    template: `
        <!--<mat-card [formGroup]="subForm">
            <mat-card-content fxLayout="column">-->
                <div fxLayout="row" fxLayoutGap="10px">
                    <div fxFlex="10" *ngIf="subForm?.value?.orderNo != 0 ">
                        <h2 style="color: gray;">{{subForm?.value?.orderNo}}</h2>
                    </div>
                    <div fxFlex="subForm?.value?.orderNo == 0 ? 90 : 80">
                        <app-employee-autocomplete-through
                            [priamryId]="subForm.get('concernedEmployeeId')"
                            [priamryKey]=" 'id' "
                            [orderNo]="subForm.get('orderNo')"
                            [applicationStatusId]="subForm.get('applicationStatusId')"
                            [applicationId]="subForm.get('applicationId')"
                            placeholder="Application Concern"
                            [itemControl]="subForm.get('concernedEmployee')">
                        </app-employee-autocomplete-through>
                        
                    </div>

                    <!--<div fxFlex="30">
                        <mat-form-field style="width: 100%">
                            <mat-select placeholder="Concern Type" [formControl]="subForm.get('applicationConcernTypeId')">
                                <mat-option *ngFor="let item of applicationConcernTypes" [value]="item.id">
                                    {{item.name}}
                                </mat-option>
                            </mat-select>
                        </mat-form-field>
                    </div>
                    -->
                    
                        <ng-content></ng-content>
                    
                </div>
                
                <!--
                Order: {{subForm?.value?.orderNo}}
                <p *ngIf="subForm?.value?.applicationThroughEmployeeId !== tokenService?.getUserToken()?.id">Remarks: {{subForm?.value?.remarks}}</p>
                -->

                <mat-form-field
                class="input-full-width"
                *ngIf="subForm?.value?.applicationThroughEmployeeId == tokenService?.getUserToken()?.id">
                    <textarea matInput placeholder="Remarks" formControlName="remarks"></textarea>
                </mat-form-field>
            <!--</mat-card-content>
            <mat-card-actions>-->
                
            <!--</mat-card-actions>
            
        </mat-card>-->
    `,
    providers: [TokenService, ProgramOfficesQueryService]
})
export class ThroughSingleFormComponent implements OnInit{
    @Input()subForm: FormGroup;
    @Input()statusItems;
    @Output() onDelete = new EventEmitter();

    applicationConcernTypes = [
        {id: 1, name: 'To'}
        , {id: 2, name: 'Through'}
    ]

    programOfficeList: any[];
    constructor(public tokenService: TokenService
        , private programOfficeService: ProgramOfficesQueryService){}
    
    ngOnInit(){
        // let _localDBUser = this.tokenService.getUserToken();
        // console.log(_localDBUser)
        this.programOfficeService.Get()
            .subscribe((res:any[])=>{
                this.programOfficeList = res;
            });

            //console.log(this.subForm.value);
           
            

    }

    onItemDeleted(_event){
        this.onDelete.emit(_event);
    }
}