import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IStudentCommitmentsReportView } from 'src/app/Interface/IStudentCommitments';
import { StudentCommitmentsQueryService } from 'src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsQueries.service';
import { CommitmentMap } from 'src/app/Classes/CommitmentMap';

export interface DialogData{
  studentId: string;
}

@Component({
  selector: 'app-comitment-dialog-view',
  templateUrl: './comitment-dialog-view.component.html',
  styleUrls: ['./comitment-dialog-view.component.scss']
})
export class ComitmentDialogViewComponent implements OnInit {
  @Input()StudentId:string;
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      //width: '250px',
      data: {studentId: this.StudentId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
      <h1 mat-dialog-title>All Commitments</h1>
      <div mat-dialog-content>
        <app-student-commitment-report-table [ReportSource]="dataList"></app-student-commitment-report-table>
      </div>
      <div mat-dialog-actions>
        
        <button mat-button (click)="onNoClick()" cdkFocusInitial>Ok</button>
      </div>`,
})
export class DialogOverviewExampleDialog implements OnInit {
  dataList:IStudentCommitmentsReportView[];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private commitments: StudentCommitmentsQueryService) {}

    ngOnInit(){
      console.log(this.data.studentId);
      // this.dataList = this.commitments.GetByStucentId(this.data.studentId);
      this.commitments.GetByStudentId(this.data.studentId)
        .map(CommitmentMap)
        .subscribe(res=>{
          this.dataList = res;
        })
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
