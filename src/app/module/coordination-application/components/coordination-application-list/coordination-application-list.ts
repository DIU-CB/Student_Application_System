
import { Component, OnInit, Input } from "@angular/core";
import { ApplicationConcernsQueryService } from "src/app/core/serviceModule/ApplicationConcerns/ApplicationConcerns.query.service";
// import { StudentCommitmentQueryService } from "src/app/core/serviceModule/StudentCommitments/StudentCommitments.query";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { StudentCommitmentsQueryService } from "src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsQueries.service";
@Component({
    selector: 'app-coordination-application-list',
    templateUrl: './coordination-application-list.html',
    providers: [ApplicationConcernsQueryService],
    styles:[`
        .mat-card-title{
            font-size: 1.2em;
        }
    `]
})
export class CoordinationApplicationListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    @Input() dataSource;
    showDetails:boolean = false;
    constructor(
        private applicationConcernsQueryService: ApplicationConcernsQueryService
        , private studentCommitment: StudentCommitmentsQueryService
        ){super()}
    ngOnInit(){
    }

    PreViewStatus(_item){
        _item['statusList'] = [];
        if (!_item.statusOpen) {
            _item['loaderEnable'] = true;
            this.subscribe$.add(
                this.applicationConcernsQueryService.GetById(_item.id)
                .subscribe((res)=>{
                    _item.statusList = res;
                    _item['statusOpen'] = true;
                    _item['loaderEnable'] = false;
                    
                })
            )
        } else {
            _item.statusOpen = !_item.statusOpen
        }
    }

    PreViewCommitments(_item){
        _item['commitmentList'] = [];
        if (!_item.commitmentOpen) {
            //_item['loaderEnable'] = true;
            this.subscribe$.add(
                this.studentCommitment.GetByStudentId(_item.studentId)
                .subscribe((res)=>{
                    _item.commitmentList = res;
                    _item['commitmentOpen'] = true;
                    //_item['loaderEnable'] = false;
                    
                })
            )
        } else {
            _item.commitmentOpen = !_item.commitmentOpen
        }
    }

    // GetSubItems(_id:string){
    //     let dta = this.applicationConcernsQueryService.GetById(_id)
    //     return dta.subscribe(data => data);
    // }

    // GetCommitment(StuentId?){
    //     return 
    // }

    
}