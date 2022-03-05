import { Component, OnInit } from "@angular/core";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DeleteDialog } from "src/app/shared/components/UI-Kit/Dialog/delete-dialog/delete-dialog";
import { MatDialog, MatSnackBar } from "@angular/material";
import { StudentApplicationWriteService } from "src/app/core/serviceModule/StudentApplication/student.application.write";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
// import { StudentCommitmentQueryService } from "src/app/core/serviceModule/StudentCommitments/StudentCommitments.query";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { StudentCommitmentsQueryService } from "src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsQueries.service";


@Component({
    selector: 'student-commitment-list',
    templateUrl: './student-commitment-list.component.html'
})


export class StudentCommitmentListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
    studentCommitmentList;
    // confirm:boolean = false;
     elableLoader:boolean = false;
    constructor(
        // public dialog: MatDialog
         public studentCommitmentQueryService: StudentCommitmentsQueryService
        // , public studentApplicationWriteSerivce: StudentApplicationWriteService
        // , public notify: PopNotificationService
        ) { super() }
  
    ngOnInit() {
        this.elableLoader = true;
        this.subscribe$.add(
            this.studentCommitmentQueryService.Get()
            .subscribe((res)=>{
                this.studentCommitmentList = res;
                this.elableLoader = false
            },(err)=>{
                this.elableLoader = false
            })
        )
    }

    
  
}

