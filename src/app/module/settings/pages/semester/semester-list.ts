import { Component, OnInit } from "@angular/core";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'app-semester-list-page',
    template: `
        <mat-toolbar class="page-toolbar">  
            Semester List
        </mat-toolbar>

        <div fxLayout="row" fxLayoutAlign="center center">
            <app-semester-list></app-semester-list>
        </div>
        

        <button mat-mini-fab class="ui-float-button" (click)="GenerateSemester()" title="Generate New Semester">
            <mat-icon aria-label="Example icon-button with a heart icon">add</mat-icon>
        </button>
    `
})
export class SemesterListPageComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    constructor(private semesterService: SemesterQueryService, private notify: PopNotificationService){super()}
    ngOnInit(){

    }

    GenerateSemester(){
        this.subscribe$.add(
            this.semesterService.Save({})
            .subscribe((res)=>{
                this.notify.Success('New Semester sucessfylly generated!!')
            }, ()=>{
                this.notify.Error()
            })
        )
    }

}