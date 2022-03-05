import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PrintService } from 'src/app/shared/Print/print.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/service/unsubscribe-on-destroy-adapter';
import { IStudentCommitments, IStudentCommitmentsView, IStudentCommitmentsReportView } from 'src/app/Interface/IStudentCommitments';
import 'rxjs/add/operator/map'
import { CommitmentMap } from 'src/app/Classes/CommitmentMap';
import { StudentCommitmentsQueryService } from 'src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsQueries.service';
import { STUDENT_ID } from 'src/app/Classes/SearchParams';

@Component({
  selector: 'app-student-commitment',
  templateUrl: './student-commitment.component.html',
  styleUrls: ['./student-commitment.component.scss']
})
export class StudentCommitmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

    CommitmentList:IStudentCommitmentsView[];
    searchForm:FormGroup;
    
    constructor(
        private fb: FormBuilder
        , public print: PrintService
        , private studentCommitments: StudentCommitmentsQueryService
        ){
            super()
        }

    
    
    ngOnInit(){
        this.searchForm = this.fb.group({
            [STUDENT_ID] : new FormControl("")
        })
        //this.Search()
    }

    Search(){
        //this.ReportList = this.dueService.Get(this.searchForm.value)
        this.subscribe$.add(
            this.studentCommitments.GetByStudentId(this.searchForm.value[STUDENT_ID])
            .map(CommitmentMap)
            .subscribe((res:IStudentCommitmentsReportView[])=>{
              this.CommitmentList = res;
            })
        )
    }
    Reset(){
        this.searchForm.reset({
            [STUDENT_ID]: ''
        })
    }

}
