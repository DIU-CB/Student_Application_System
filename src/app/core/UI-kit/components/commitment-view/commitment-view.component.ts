import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { StudentCommitmentsQueryService } from 'src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsQueries.service';
import { IStudentCommitments } from 'src/app/Interface/IStudentCommitments';
import { CommitmentListFromRow } from 'src/app/Classes/CommitmentMap';

@Component({
  selector: 'app-commitment-view',
  templateUrl: './commitment-view.component.html',
  styleUrls: ['./commitment-view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
  providers: [StudentCommitmentsQueryService]
})
export class CommitmentViewComponent implements OnInit, OnChanges {
  @Input()applicationId?:string;
  @Input()commitmentList?:IStudentCommitments[];
  constructor(private studentCommitmentQuery: StudentCommitmentsQueryService) { }

  ngOnInit() {
    // console.log(this.applicationId)
    // console.log(this.commitmentList)
  }
  
  ngOnChanges(change:SimpleChanges){
    // console.log(this.applicationId)
    // let cng = change.applicationId;
      // debugger
      if (change.applicationId) {
        this.applicationId = change.applicationId.currentValue;
        if (this.applicationId) {
          this.studentCommitmentQuery.GetByApplicationId(this.applicationId)
          .map(CommitmentListFromRow)
            .subscribe((res)=>{
              // console.log(res)
              this.commitmentList = res;
            })
        }
      }
      
  }

}
