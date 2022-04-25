import { Component, OnInit } from "@angular/core";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { ApplicationQueryService } from "src/app/core/serviceModule/ApplicationQueries/ApplicationQueries.service";
import { ApplicationPreceedingsWriteService } from "src/app/core/serviceModule/ApplicationPreceedings/ApplicationPreceedings.write.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { StudentDueAndCgpaSummariesQueryService } from "src/app/core/serviceModule/StudentDueAndCgpaSummaries/student-due-and-cgpa-summaries.query.service";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { TokenService } from "src/app/core/authentication/Services/token.service";
import 'rxjs/Rx';
import { ApplicationConcernsQueryService } from "src/app/core/serviceModule/ApplicationConcerns/ApplicationConcerns.query.service";
import { StudentCommitmentsWriteService } from "src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsWrite.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { Observable } from "rxjs/Rx";
import { IApplicationType } from "src/app/Interface/IApplicationType";
import { combineLatest, forkJoin } from 'rxjs';
import { CertificateService } from "src/app/core/serviceModule/CertificateService/certificate.service";
import { ApplicationPreceedingsQueryService } from "src/app/core/serviceModule/ApplicationPreceedings/ApplicationPreceedings.query.service";
import { DateFormatService } from "src/app/shared/service/date-format.service";
interface Retrive {
    propa: string;
}

interface Create {
    propb: string;
}

interface Crude extends Retrive, Create {
    propc: string;
}

@Component({

    selector: 'app-authority-application-proceed-form',
    styles: [`.hide{ display: none }`],
    templateUrl: './authority-application-create.component.html',
    providers: [ApplicationQueryService
        , PopNotificationService
        , ApplicationPreceedingsWriteService
        , CommonDataQueriesService
        , StudentDueAndCgpaSummariesQueryService
        , StudentApplicationQueryService
        , TokenService
        , ApplicationConcernsQueryService
        , StudentCommitmentsWriteService
    ]
})

export class AuthorityApplicationProceedFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
    applicationForm: FormGroup;
    commitmentForm: FormGroup;
    applicationDetails;
    studentDueAndCGPADetails;
    applicationStatusItems;
    errorList;
    uploadedFiles;
    uploadedFilesError;

    orderNO: FormGroup;
    applicationStatusId: FormGroup;
    applicationDetailsForUplodFile;
    FileDownloadDate: Date;

    isAdded: number = 0;

    applicationConcernTypes = [
        { id: 1, name: 'To' }
        , { id: 2, name: 'Through' }
    ]

    constructor(private fb: FormBuilder
        , private applicationQyeryService: ApplicationQueryService
        , private route: ActivatedRoute
        , private applicationPreceedingsService: ApplicationPreceedingsWriteService
        , private notify: PopNotificationService
        , private commondataQuery: CommonDataQueriesService
        , private StudentDueAndCgpaSummariesService: StudentDueAndCgpaSummariesQueryService
        , private studentApplicationQueryService: StudentApplicationQueryService
        , public tokenService: TokenService
        , private commitmentService: StudentCommitmentsWriteService
        , private certificateService: CertificateService
        , private applicationPreceedingsQueryService: ApplicationPreceedingsQueryService
        , private dateFormatService: DateFormatService
    ) { super(); }

    ngOnInit() {


        this.orderNO = this.fb.group({
            defaultOrderNo: new FormControl(1)
        });

        this.applicationStatusId = this.fb.group({
            defaultApplicationStatusId: new FormControl(1)
        });






        this.applicationForm = this.fb.group({
            rowVersion: new FormControl(),
            id: new FormControl(''),
            canApprove: new FormControl(false),
            applicationStatusId: new FormControl(''),
            remarks: new FormControl(''),
            employeeId: new FormControl(''),
            forwardToEmployeeId: new FormControl(''),
            forwardToEmployee: new FormControl(''),
            applicationBody: new FormControl(),
            applicationConcerns: this.fb.array([
                // this.applicationThroughsGroup()
            ])
        });

        console.log(this.applicationForm);

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
        //this.addItem()

        this.subscribe$.add(
            this.commondataQuery.GetStatus()
                .subscribe((res) => {
                    this.applicationStatusItems = res;
                })
        )



        this.subscribe$.add(
            this.route.params.subscribe((params) => {
                this.subscribe$.add(
                    this.applicationQyeryService.GetById(params.id)
                        .map((response) => {
                            let res = JSON.parse(response.jsonData)
                            res.applicationConcerns.forEach(() => {
                                this.addItem();
                            });
                            return res;
                        })
                        .subscribe((res) => {

                            this.applicationDetails = res;

                            this.subscribe$.add(
                                this.applicationPreceedingsQueryService.GetApplicationByApplicationIdAndStudentId(res.id, res.studentId)
                                    .subscribe((res) => {

                                        this.applicationDetailsForUplodFile = res;
                                        if(this.applicationDetailsForUplodFile.fileDownloadDate!=null)
                                        this.FileDownloadDate=new Date(this.applicationDetailsForUplodFile.fileDownloadDate);
                                    })
                            )
                            this.subscribe$.add(
                                // this.StudentDueAndCgpaSummariesService.GetById(res.studentId)
                                this.StudentDueAndCgpaSummariesService.GetCgpa(res.studentId)
                                    .subscribe((res) => {
                                        this.studentDueAndCGPADetails = res;
                                    })
                            )

                            if (res.studentCommitment) {
                                this.commitmentForm.patchValue(res.studentCommitment)
                            } else {
                                this.commitmentForm.patchValue({
                                    id: "",
                                    applicationId: res.id,
                                    commitment: "",
                                    remarks: "",
                                    remarksByEmployeeId: "",
                                    updatedDate: "",
                                    duesUpToLastSemester: "",
                                    currentInstallment: "",
                                    totalPayable: "",
                                    paid: "",
                                    duesUpToMidOrFinalOrReg: null,
                                    year: "",
                                    semesterId: "",
                                    remarksByEmployee: ""
                                })
                            }




                            this.subscribe$.add(
                                this.studentApplicationQueryService.GetFiles(res.id, res.studentId)
                                    .subscribe((fileres) => {
                                        this.uploadedFiles = fileres;
                                    }, (err) => {
                                        this.uploadedFilesError = err.error.messages;
                                    })
                            )



                            res['employeeId'] = this.tokenService.getUserToken().id;

                            this.applicationForm.patchValue(
                                res
                            )
                        })
                )
                // console.log(params)
            })
        )

        this.subscribe$.add(

            this.commitmentForm.get('duesUpToLastSemester')
                .valueChanges
                .map((res) => {
                    let val = this.commitmentForm.value;
                    let _duesUpToLastSemester = res || 0;
                    let _currentInstallment = val.currentInstallment || 0;
                    let _total = _duesUpToLastSemester + _currentInstallment;
                    return _total;
                })
                .subscribe((val) => {
                    this.commitmentForm.get('totalPayable').patchValue(val);
                }),

            this.commitmentForm.get('currentInstallment')
                .valueChanges
                .map((res) => {
                    let val = this.commitmentForm.value;
                    let _duesUpToLastSemester = val.duesUpToLastSemester || 0;
                    let _currentInstallment = res || 0;
                    let _total = _duesUpToLastSemester + _currentInstallment;
                    return _total;
                })
                .subscribe((val) => {
                    this.commitmentForm.get('totalPayable').patchValue(val);
                })

        )



    }



    CalculatePayable(Dues: number, CurrentValue: number) {
        let val = this.commitmentForm.value;
        let _duesUpToLastSemester = val.duesUpToLastSemester || 0;
        let _currentInstallment = val.currentInstallment || 0;
        let _total = _duesUpToLastSemester + _currentInstallment;
        //this.commitmentForm.get('totalPayable').patchValue(_total);
        return _total;
    }

    RemoveEmptyFormRow() {
        let control = this.GetApplicationFormListObject();
        for (let index = 0; index < control.length; index++) {
            const element = control.controls[index];
            if (element.value.id == null) {
                this.onItemDeleted(index);
            }
        }
    }

    ChangeStatus(e) {
        // this.subscribe$.add(
        //     this.commitmentForm.valueChanges.subscribe(()=>{

        //     })
        // )
        //if (e == '2') {
        let formCrtl = this.GetApplicationFormListObject();
        const status = this.applicationStatusItems.filter(item => { return item.id == e });
        for (let index = 0; index < formCrtl.controls.length; index++) {
            const formGroup = formCrtl.controls[index];
            const formGroupValue = formGroup.value;
            if (formGroupValue.applicationConcernTypeId == 1) {
                formGroupValue.applicationStatusId = e;
                formGroupValue.applicationStatus = status[0];
                formGroup.patchValue(formGroupValue);
                break;
            }
        }
        // console.log(status)
        //}
        if (e == '3' || e == '7') {
            this.RemoveEmptyFormRow();
            this.addItem();
            //this.isAdded = 1;
        } else {
            this.RemoveEmptyFormRow();
        }
    }



    applicationConcernsGroup() {
        return {
            id: new FormControl(),
            applicationId: new FormControl(),
            concernedEmployeeId: new FormControl(),
            concernedEmployee: new FormControl(),
            applicationStatusId: new FormControl(),
            applicationStatus: new FormControl(),
            remarks: new FormControl(),
            canApprove: new FormControl(false),
            applicationConcernTypeId: new FormControl(),
            applicationConcernType: new FormControl(),
            orderNo: new FormControl()
        }
    }

    addItem(): void {
        let mainControl = this.applicationForm;
        let control = <FormArray>mainControl.controls['applicationConcerns'];
        let grp = this.fb.group(this.applicationConcernsGroup());
        control.push(grp);

        //Set Default Value
        // this.applicationForm.get('applicationConcerns').
        let fg = control.controls[control.controls.length - 1] as FormGroup;
        // debugger
        fg.get('concernedEmployee').setValidators([Validators.required])
        fg.get('concernedEmployee').updateValueAndValidity();
        fg.get('concernedEmployeeId').setValidators([Validators.required])
        fg.get('concernedEmployeeId').updateValueAndValidity();
        fg.patchValue({
            "applicationStatusId": "6",
            "applicationStatus": {
                "id": "6",
                "name": "Dispatched"
            },
            "applicationConcernTypeId": 2,
            "applicationConcernType": {
                "id": 2,
                "name": "Through"
            }
        })
        //console.log(fg)
    }



    onItemDeleted(index) {
        let control = this.GetApplicationFormListObject();
        control.removeAt(index);
    }

    GetApplicationFormListObject(): FormArray {
        return <FormArray>this.applicationForm.controls['applicationConcerns'];
    }

    IsStatusSelected(statusId) {
        // debugger
        let controls = this.GetApplicationFormListObject().value;
        const item = controls.filter(item => { return item.applicationStatusId == statusId })
        // console.log(item);
        return item.length > 0;
    }

    // onItemDeleted(_event, i){
    //     console.log(_event, i)
    // }

    // GetApplicationConcernThrough(){
    //     let formThrough:FormArray;
    //     let formArray = this.GetApplicationFormListObject();
    //     console.log(formArray)
    //     for (let index = 0; index < formArray.controls.length; index++) {
    //         const element = formArray.controls[index];
    //         if (element.value.applicationConcernTypeId != 1) {
    //             formThrough.push()    
    //         }
    //         console.log(element)
    //     }
    // }

    SaveCommitment() {
        let amount = this.commitmentForm.value.duesUpToLastSemester
        let commitId = this.commitmentForm.value.id;
        let CommitSubs: Observable<any>;
        if (amount && commitId) {
            //Update
            CommitSubs = this.commitmentService.Put(this.commitmentForm.value, this.commitmentForm.value.id);
        }
        if (amount && !commitId) {
            //Insert
            CommitSubs = this.commitmentService.Save(this.commitmentForm.value);
        }
        // return CommitSubs
        this.subscribe$.add(
            CommitSubs.subscribe((res) => {
                this.notify.Success()
            }, (err) => {
                this.errorList = err.error.messages;
                this.notify.Error()
            })
        )
    }


    toggleFlagForSubmitButton: boolean = true;

    Submit() {
        console.log(this.applicationForm.value)

        let appConcernList = this.applicationForm.get('applicationConcerns').value;
        let appConcern = appConcernList.filter(item => { return item.concernedEmployeeId == this.tokenService.getUserToken().id })[0]
        console.log(appConcern)
        let statusId = appConcern.applicationStatusId;
        this.toggleFlagForSubmitButton = false;
        console.log(this.toggleFlagForSubmitButton);
        // this.SaveCommitment();
        this.SaveConsern();

        // if (statusId != "6") { munna
        //     if (statusId == "2" || statusId == "5") {
        //         //save or update commitment first
        //         this.SaveCommitment();
        //         //then MainSave
        //         this.SaveConsern();
        //     }
        //     if(statusId == "3" || statusId == "7"){
        //         //save or update commitment first
        //         this.SaveCommitment();
        //         //then MainSave
        //         this.SaveConsern();
        //     }
        // }





    }

    SaveConsern() {
        //this.subscribe$.add(
        this.applicationPreceedingsService.Save(this.applicationForm.value)
            .subscribe((res) => {

                this.notify.Success()
            }, (err) => {
                this.errorList = err.error.messages;
                this.notify.Error()
            })
        //)
    }

    // firstTimer = timer(0, 1000);
    // secondTimer = timer(500, 1000);
    // combinedTimers = combineLatest(this.firstTimer, this.secondTimer)

    // ClickTime(){
    //     this.combinedTimers.subscribe(res=>console.log(res))
    // }

    ProcessFile(event) {
        let fileList: FileList = event.target.files;
        var promise = new Promise((resolve, reject) => {
            if (fileList.length > 0) {
                let file: File = fileList[0];
                if (file.size > 512000) {
                    reject(new Error("File size is greater then 500kB"))
                }

                var reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                }
                reader.readAsDataURL(file);
            }


        });
        return promise;
    }


    CertificateUpload(event) {
        console.log(this.applicationDetailsForUplodFile)
        console.log(event)

        this.ProcessFile(event)
            .then(
                (res) => {
                    let fileList: FileList = event.target.files;
                    console.log(fileList.item(0));
                    const formData = new FormData();

                    formData.append('ApplicationId', this.applicationDetailsForUplodFile.id);
                    formData.append('StudentId', this.applicationDetailsForUplodFile.studentId);
                    formData.append('file', fileList.item(0), fileList.item(0).name);

                    this.certificateService.CertificateUpload(formData).subscribe(
                        (res) => {

                            this.notify.Success("Successfully Saved Certificate");

                        },
                        (err) => {
                            this.notify.Error("Error in Saving Certificate");

                        }
                    );


                }
                , (err) => {
                    this.notify.Error(err.message);
                }
            );
    }

    CertificateDownloadDateUpdate() {
        let DownloadDate;
        if (this.FileDownloadDate != null) {
            DownloadDate = this.dateFormatService.ToYearMonthDate(this.FileDownloadDate)
        }
        const formData = new FormData();

        formData.append('ApplicationId', this.applicationDetailsForUplodFile.id);
        formData.append('FileDownloadDate', DownloadDate);


        this.certificateService.DownloadDateForCertificate(formData).subscribe(
            (res) => {

                this.notify.Success("Successfully Saved Certificate Download Date");

            },
            (err) => {
                this.notify.Error("Error in Saving Certificate Download Date");

            }
        );
    }

}


