import { Component, OnInit, Input } from '@angular/core';
import { IStudentCommitmentsReportView } from 'src/app/Interface/IStudentCommitments';

@Component({
  selector: 'app-student-commitment-report-table',
  templateUrl: './student-commitment-report-table.component.html',
  styleUrls: ['./student-commitment-report-table.component.scss']
})
export class StudentCommitmentReportTableComponent implements OnInit {
  @Input() ReportSource?:IStudentCommitmentsReportView[];
  constructor() { }

  ngOnInit() {
  }

}
