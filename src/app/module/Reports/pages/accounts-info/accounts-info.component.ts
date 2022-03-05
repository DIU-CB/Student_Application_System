import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { PROGRAM_ID, SEMESTER_ID } from '../../../../Classes/SearchParams';
import { CommonDataQueriesService } from 'src/app/core/serviceModule/CommonDataQueries/common-data-queries.service';
import { SemesterQueryService } from 'src/app/core/serviceModule/SemesterService/semester-query.service';
import { PrintService } from 'src/app/shared/Print/print.service';
import { SemesterProgramListInitialize } from '../../Classes/SemesterCampusListInitialize';
import { Observable } from 'rxjs';
import { StudentCommitmentsQueryService } from 'src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsQueries.service';
import { IStudentCommitments, IStudentCommitmentsReportView, IStudentCommitmentsReport } from 'src/app/Interface/IStudentCommitments';
import { CommitmentMap } from 'src/app/Classes/CommitmentMap';

@Component({
  selector: 'app-accounts-info',
  templateUrl: './accounts-info.component.html',
  styleUrls: ['./accounts-info.component.scss']
})
export class AccountsInfoComponent extends SemesterProgramListInitialize implements OnInit {

  AccountInfoList:IStudentCommitmentsReportView[];
  searchForm:FormGroup;
  
  constructor(
      public commonQuery: CommonDataQueriesService
      , public semesterService: SemesterQueryService
      , private fb: FormBuilder
      , public dueService: StudentCommitmentsQueryService
      , public print: PrintService
      ){
          super(commonQuery, semesterService);
      }

  
  
  ngOnInit(){
    
      this.searchForm = this.fb.group({
          [PROGRAM_ID] : new FormControl("35"),//35
          [SEMESTER_ID] : new FormControl("193")//193
      })

      //this.Search()
  }

  Search(){
      //this.AccountInfoList = this.dueService.Get(this.searchForm.value)
      this.subscribe$.add(
          this.dueService.GetReportByProgramAndSemisterId(this.searchForm.value)
          .map(CommitmentMap)
        //   .map((resp:IStudentCommitmentsReport[])=>{
        //     for (let i = 0; i < resp.length; i++) {
        //       let newData = [];
        //       const element = resp[i];
        //       if (element.dateOne && element.amountOne) {
        //         newData[0] = {date: element.dateOne, amount: element.amountOne, note: element.noteOne}
        //       }
              
        //       if (element.dateTwo && element.amountTwo) {
        //         newData[1] = {date: element.dateTwo, amount: element.amountTwo, note: element.noteTwo}
        //       }
              
        //       if (element.dateThree && element.amountThree) {
        //         newData[2] = {date: element.dateThree, amount: element.amountThree, note: element.noteThree}
        //       }
              
        //       if (element.dateFour && element.amountFour) {
        //         newData[3] = {date: element.dateFour, amount: element.amountFour, note: element.noteFour}
        //       }
        //       resp[i]['commitments'] = newData;
        //     }

        //     return resp;
        //   })
          .subscribe((res:IStudentCommitmentsReportView[])=>{
              this.AccountInfoList = res;
          })
      )
  }
  Reset(){
      this.searchForm.reset({
          [PROGRAM_ID]: '',
          [SEMESTER_ID]: ''
      })
  }
}
