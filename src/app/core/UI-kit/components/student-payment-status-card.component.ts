import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { StudentDueAndCgpaSummariesQueryService } from '../../serviceModule/StudentDueAndCgpaSummaries/student-due-and-cgpa-summaries.query.service';
import { IStudentDue } from 'src/app/Interface/IStudentDue';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/service/unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-student-payment-status-card',
  template: `
    <div *ngIf="enableLoader">Loading accounts info...</div>
    <mat-card class="info-card" *ngIf="dataSource">
      <mat-card-header>
        <mat-card-title>{{dataSource?.balance}}/- Net Balance</mat-card-title>
        <mat-card-subtitle>Payment Details
          <button mat-button (click)="showDetails = !showDetails" matTooltip="Show more info. about student">
            <i *ngIf="!showDetails" class="material-icons">expand_more</i>
            <i *ngIf="showDetails" class="material-icons">expand_less</i>
          </button>  
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content *ngIf="showDetails">
        <!--<div>Previous Balance: {{dataSource?.previousBalance}} /-</div>-->
        <div>Current Payable: {{dataSource?.currentPayable}} /-</div>
        <div>Current Paid: {{dataSource?.currentPaid}} /-</div>
      </mat-card-content>
    </mat-card>
  `
})
export class StudentPaymentStatusCardComponent extends UnsubscribeOnDestroyAdapter implements OnChanges {
    showDetails:boolean = false;
    enableLoader:boolean = false;
    dataSource:IStudentDue;
    @Input()studentId;
    constructor(private cgpaService:StudentDueAndCgpaSummariesQueryService){ super() }

    ngOnChanges(changes: SimpleChanges){
      this.enableLoader = true;
      if (!changes.studentId.isFirstChange()) {
        this.subscribe$.add(
          this.cgpaService.GetDue(changes.studentId.currentValue)
            .subscribe((res:IStudentDue)=>{
              this.dataSource = res;
              this.enableLoader = false;
            })
        )
      }
    }

}
