import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-info-card',
  template: `
    <circle-loader *ngIf="!dataSource" ></circle-loader>
    <mat-card *ngIf="dataSource">
      <mat-card-header>
        <div mat-card-avatar style="background-size: cover">
          <app-user-image [userId]="dataSource?.id"></app-user-image>
        </div>
        <mat-card-title>{{dataSource?.name}}</mat-card-title>
        <mat-card-subtitle>
          Student Details
          <button mat-button (click)="showDetails = !showDetails" matTooltip="Show more info. about student">
            <i *ngIf="!showDetails" class="material-icons">expand_more</i>
            <i *ngIf="showDetails" class="material-icons">expand_less</i>
          </button>
         </mat-card-subtitle>
        
      </mat-card-header>
      <mat-card-content *ngIf="showDetails">
        <div>Roll: {{dataSource?.id}}</div>
        <div>Mobile: {{dataSource?.mobile}}</div>
        <div>Campus: {{dataSource?.campus?.name}}</div>
        <div>Program: {{dataSource?.program?.name}}</div>
        <div>Faculty: {{dataSource?.faculty?.name}}</div>
        <div>Shift: {{dataSource?.shift?.name}}</div>
        <div>Father Mobile: {{dataSource?.fatherMobile}}</div>
        <div>Local Guardian Mobile: {{dataSource?.localGuardianMobile}}</div>
      </mat-card-content>
    </mat-card>
  `
})
export class StudentInfoCardComponent {
    @Input()dataSource: any;
    showDetails:boolean = false;
}
