import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { StudentCommitmentsWriteService } from "src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsWrite.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
@Component({
    selector: 'app-commitment-form',
    templateUrl: './commitment-form.component.html',
    providers: [StudentCommitmentsWriteService, PopNotificationService]
})
export class CommitmentFormComponent implements OnInit{
    commitmentForm:FormGroup;
    @Input() detailsData;
    constructor(private fb: FormBuilder, private commitmentService: StudentCommitmentsWriteService, private notify: PopNotificationService){}
    ngOnInit(){
        this.commitmentForm = this.fb.group({
            id: new FormControl(),
            applicationId: new FormControl(),
            commitment: new FormControl(),
            remarks: new FormControl(),
            remarksByEmployeeId: new FormControl(),
            updatedDate: new FormControl(),
            duesUpToLastSemester: new FormControl(),
            currentInstallment: new FormControl(),
            totalPayable: new FormControl(),
            paid: new FormControl(),
            duesUpToMidOrFinalOrReg: new FormControl(),
            year: new FormControl(),
            semesterId: new FormControl(),
            remarksByEmployee: new FormControl()
        })

        this.commitmentForm.patchValue(this.detailsData)
    }

    SaveCommitment(){
        this.commitmentService.Put(this.commitmentForm.value, this.commitmentForm.value.id)
                .subscribe((res)=>{
                    this.notify.Success()
                }, (err)=> {
                    //this.errorList = err.error.messages;
                    this.notify.Error() 
                })
    }
}