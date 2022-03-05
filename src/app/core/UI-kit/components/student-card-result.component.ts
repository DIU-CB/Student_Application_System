import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StudentDueAndCgpaSummariesQueryService } from '../../serviceModule/StudentDueAndCgpaSummaries/student-due-and-cgpa-summaries.query.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-result-card',
  template: `
  
    <circle-loader [diameter]="30" *ngIf="!dataSource" ></circle-loader>
      <mat-card class="info-card" *ngIf="dataSource">
        <mat-card-header>
          <mat-card-title>{{dataSource}} CGPA</mat-card-title>
          <mat-card-subtitle>Result</mat-card-subtitle>
        </mat-card-header>
        
      </mat-card>
  `,
  providers: [StudentDueAndCgpaSummariesQueryService]
})
export class StudentResultCardComponent implements OnInit, OnChanges{
    dataSource;
    @Input()studentId;
    constructor(private cgpaService:StudentDueAndCgpaSummariesQueryService){}

    ngOnChanges(changes: SimpleChanges){
      // debugger
      if (!changes.studentId.isFirstChange()) {
        this.cgpaService.GetCgpa(changes.studentId.currentValue)
          .subscribe((res)=>{
            this.dataSource = res;
          });
      }
    }

    ngOnInit(){
      // debugger
      //this.dataSource = this.cgpaService.GetCgpa(this.studentId);
    }
}
