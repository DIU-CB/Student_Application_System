import { Component, OnInit } from "@angular/core";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'app-semester-list',
    template: `
        <mat-list role="list">
            <mat-list-item role="listitem" *ngFor="let item of semesterList; let i = index;">{{item.name}}</mat-list-item>
        </mat-list>
    `
})
export class SemesterListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    semesterList;
    constructor(private semesterService: SemesterQueryService){super()}
    ngOnInit(){
        this.subscribe$.add(
            this.semesterService.Get()
            .subscribe((res)=>{
                this.semesterList = res;
            })
        )
    }
}