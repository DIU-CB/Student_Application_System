import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { ApplicationQueryService } from "src/app/core/serviceModule/ApplicationQueries/ApplicationQueries.service";
import { ActivatedRoute } from "@angular/router";
import { ApplicationDispatchesService } from "src/app/core/serviceModule/ApplicationDispatches/ApplicationDispatches.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { StudentDueAndCgpaSummariesQueryService } from "src/app/core/serviceModule/StudentDueAndCgpaSummaries/student-due-and-cgpa-summaries.query.service";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MyFormValueFilterPipe } from "src/app/shared/Pipe/filterValue.pipe";
import { MyFormFilterPipe } from "src/app/shared/Pipe/filter.pipe";
import 'rxjs/Rx';
import { MentorsQueryService } from "src/app/core/serviceModule/Mentors/Mentors.query";
import { StudentCommitmentsWriteService } from "src/app/core/serviceModule/StudentCommitments.Query/StudentCommitmentsWrite.service";
import { ProgramOfficesQueryService } from "src/app/core/serviceModule/ProgramOffices/ProgramOffices.Query";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { IStudentApplication } from "src/app/core/serviceModule/StudentApplication/student.application.interface";


@Component({
    
    selector: 'app-coordination-application-forward-form',
    templateUrl: './coordination-application-forward-form.html',
    styleUrls: ['./coordination-application-forward-form.scss'],
    providers: [ApplicationQueryService, PopNotificationService, StudentDueAndCgpaSummariesQueryService, StudentApplicationQueryService
        , CommonDataQueriesService, MentorsQueryService
        , MyFormValueFilterPipe, MyFormFilterPipe, StudentCommitmentsWriteService
        , ProgramOfficesQueryService
    ]
})

export class CoordinationApplicationForwardFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

    applicationForm:FormGroup;
    commitmentForm:FormGroup;
    applicationDetails;
    studentDueAndCGPADetails;
    errorList;
    applicationStatusItems;

    // programOfficeList: any[];

    uploadedFiles;
    uploadedFilesError;
    constructor(private fb: FormBuilder
        , private applicationQyeryService: ApplicationQueryService
        , private route: ActivatedRoute
        , private applicationDispatchesService: ApplicationDispatchesService
        , private notify: PopNotificationService
        , private StudentDueAndCgpaSummariesService: StudentDueAndCgpaSummariesQueryService
        , public studentApplicationQueryService: StudentApplicationQueryService
        , private commondataQuery: CommonDataQueriesService
        , private formValueFilter: MyFormValueFilterPipe
        , private formFilter: MyFormFilterPipe
        , private mentorsQueryService: MentorsQueryService
        , private commitmentService: StudentCommitmentsWriteService
        , private programOfficeService: ProgramOfficesQueryService
        ){ super(); }

    ngOnInit(){
        this.applicationForm = this.fb.group({
            id: new FormControl(),
            shouldAddMentor: new FormControl(false, Validators.required),
            mentorOrderNo: new FormControl(),
            updatedBy: new FormControl('', Validators.required),
            urlReferer: new FormControl('', Validators.required),
            applicationBody: new FormControl(''),
            applicationConcerns: this.fb.array([
                //this.addItem()
            ]),
            rowVersion: new FormControl('', Validators.required)
        });

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
        

        this.subscribe$.add(
            this.commondataQuery.GetStatus()
                .subscribe((res)=>{
                    this.applicationStatusItems = res;
                })
        )

            // this.programOfficeService.Get()
            // .subscribe((res:any[])=>{
            //     this.programOfficeList = res;
            // });
        
        this.subscribe$.add(
            this.route.params.subscribe((params)=>{
                this.subscribe$.add(
                    this.applicationQyeryService.GetById(params.id)
                    .map((res)=>{
                        let _res = JSON.parse( res.jsonData );
                        
                        if (_res.applicationConcerns.length > 0) {
                                
                            _res.applicationConcerns.forEach(element => {
                                if (element.applicationConcernTypeId == 2) {
                                        this.AddThrough()
                                    } else {
                                        this.AddTo();
                                    } 
                                });
    
                        } else {
                            this.AddTo();
                            this.AddThrough()
                        }
                        return _res;
                    })
                    .subscribe((res)=>{
                        // let res = JSON.parse( resp.jsonData );
                        // debugger
                        if (res) {
                            this.applicationDetails = res;
                            //console.log('asdfasdfasdf',res)
                            // this.StudentDueAndCgpaSummariesService.GetById(res.studentId)
                            //     .subscribe((res)=>{
                            //         this.studentDueAndCGPADetails = res;
                            //     })
                            if (res.studentCommitment) {
                                this.commitmentForm.patchValue(res.studentCommitment)    
                            }
                            
    
                            this.subscribe$.add(
                                this.studentApplicationQueryService.GetFiles(res.id, res.studentId)
                                    .subscribe((fileres)=>{
                                        this.uploadedFiles = fileres;
                                    }, (err)=>{
                                        this.uploadedFilesError = err.error.messages;
                                    })
                            )
                            
                            // debugger
    
                            let _resObj = {
                                "id": res.id,
                                "shouldAddMentor": res.shouldAddMentor || false,
                                "updatedBy": res.updatedBy,
                                "urlReferer": res.urlReferer,
                                "applicationConcerns": res.applicationConcerns,
                                "rowVersion": res.rowVersion
                            }
    
                            // if (res.applicationTos.length > 0) {
                            //     _resObj['applicationTos'] = res.applicationTos[0];
                            // }
    
                            
                            this.applicationForm.patchValue(
                                _resObj
                            )
                           
                            
                        }
                        
                    })
                )
                    
            })
        )

        
        
        // this.applicationForm.get('shouldAddMentor').valueChanges
        //     // .map((result)=>{
        //     //     debugger
        //     //     let mentorValue = null;
        //     //     if (result) {
        //     //          this.mentorsQueryService.Get({studentId: this.applicationDetails.studentId})
        //     //             .subscribe((mentordata)=>{
        //     //                 mentorValue = mentordata;
        //     //             })
        //     //     }
        //     //     return mentorValue;
        //     // })
        //     .subscribe((res)=>{
            
        // })
        
    }

    AddMentor(){
        let frmArray = this.applicationForm.get('applicationConcerns')
            let frmArrayValue = frmArray.value;
            
            this.subscribe$.add(
                this.mentorsQueryService.Get({studentId: this.applicationDetails.studentId})
                .subscribe((mentordata:any)=>{
                    // mentorValue = mentordata;
                    const value = {
                        // "id": null,
                        // "applicationId": null,
                        "concernedEmployeeId": mentordata.id,
                        "concernedEmployee": mentordata,
                        // "applicationStatusId": null,
                        // "remarks": null,
                        // "canApprove": false,
                        // "applicationConcernTypeId": 2,
                        // "orderNo": frmArrayValue.length + 1
                        "isMentor": true
                    }
                    frmArrayValue[1] = value;

                    //this.AddThrough();
                    frmArray.patchValue( frmArrayValue )
                })
            )
                
    }

    // SetProgramOffices(_programId, _campusId, _index){
    //     let control = <FormGroup>this.applicationForm.controls['applicationConcerns']['controls'][_index];
    //     let data = control.value;
    //     if (data.programId && data.campusId) {
    //         this.programOfficeService.Get(data.campusId, data.programId)
    //             .subscribe((res)=>{
    //                 if (res.id) {
    //                     control.patchValue({programOfficeId: res.id });
    //                 }
    //             })
    //     }
    // }

    // drop(event: CdkDragDrop<string[]>) {
    //     moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    // }

    // drop(event: CdkDragDrop<any[]>) {
    //     debugger
    //     let mainControl = this.applicationForm.get('applicationConcerns')['controls'];
    //     let filteredControls = this.formFilter.transform(mainControl, {applicationConcernTypeId: 2})
    //     let formArray = this.fb.array(filteredControls)

    //     moveItemInArray(formArray.value, event.previousIndex, event.currentIndex);
        
    //     for (let index = 0; index < formArray.value.length; index++) {
    //         const element = formArray.value[index];
    //         element['orderNo'] = index + 1;
    //     }

    //     formArray.patchValue(formArray.value)
    // }

    hasMentor(){
        let hasMentor:boolean = false;
        if (this.applicationDetails) {
             let filteritems = this.applicationDetails.applicationConcerns.filter(app => app.concernedEmployeeId === this.applicationDetails.student.mentorId);    
             hasMentor = filteritems.length > 0;
        }
        return hasMentor;
    }

    hasMentorInForm(){
        let hasMentorInForm:boolean = false;
        let appConvernValue = this.applicationForm.get('applicationConcerns').value;
        if (appConvernValue.length > 0) {
             let filteritems = appConvernValue.filter(app => app.isMentor === true);    
             hasMentorInForm = filteritems.length > 0;
        }
        return hasMentorInForm;
    }


    applicationConcernsGroup(){
        return {
            id: new FormControl(),
            applicationId: new FormControl(),
            concernedEmployeeId: new FormControl(),
            concernedEmployee: new FormControl(),
            applicationStatusId: new FormControl(),
            remarks: new FormControl(),
            canApprove: new FormControl(false),
            applicationConcernTypeId: new FormControl(),
            orderNo: new FormControl(),
            isMentor: new FormControl(false),
            // isProgramOfficeSelected: new FormControl(false),
            programOfficeId: new FormControl("")

        }
    }

    addItem():FormGroup{
        let mainControl = this.applicationForm;
        let control = <FormArray>mainControl.controls['applicationConcerns'];
        control.push( this.fb.group(this.applicationConcernsGroup()) );
        
        let lgn = control.value.length - 1;
        let frmGrp = control.controls[lgn] as FormGroup;
        frmGrp.patchValue({orderNo: lgn})
        return frmGrp;
    }

    AddThrough(){
        let item = this.addItem();
        item.patchValue({
            applicationConcernTypeId: 2
        })
    }


    AddTo(){
        let item = this.addItem();
        item.patchValue({
            applicationConcernTypeId: 1
        })
    }


    onItemDeleted(_item) {
        let control = <FormArray>this.applicationForm.controls['applicationConcerns']
        let _indx = 0;
        if (_item.value.concernedEmployeeId) {
            _indx = control.value.findIndex(item => item.concernedEmployeeId === _item.value.concernedEmployeeId);
        } else {
            _indx = control.value.findIndex(item => item.orderNo === _item.value.orderNo);
        }
         
        control.removeAt(_indx)
        
    }

    Delete(item:any){
        let _item = item;
        if (item.value.id) {
            this.subscribe$.add(
                this.applicationDispatchesService.Delete(this.applicationForm.value.id, item.value.id)
                    .subscribe(()=>{
                        this.onItemDeleted(_item);
                        this.notify.Success('deleted successfully');
                    }, (err)=> {
                        this.errorList = err.error.messages;
                        this.notify.Error(this.errorList[0]);
                    })
            )
        } else {
            this.onItemDeleted(_item);
            //this.notify.Success('Removed!!!');
        }
    }

    // ChangeApplicationBody(item:string){
    //     this.applicationForm.get('applicationBody')
    //         .patchValue(item);
    // }


    Submit(){
        let formValue = this.applicationForm.value;
        formValue['applicationBody'] = this.applicationDetails.applicationBody;

        for (let index = 0; index < formValue.applicationConcerns.length; index++) {
            const element = formValue.applicationConcerns[index];
            if (element.orderNo == 0 && element.applicationConcernTypeId == 1) {
                element.concernedEmployeeId = "710000127"
            }
        }

        this.subscribe$.add(
            this.applicationDispatchesService.Save(this.applicationForm.value)
                .subscribe((res)=>{
                    this.notify.Success()
                }, (err)=> {
                    this.errorList = err.error.messages;
                    this.notify.Error() 
                })
        )
        // console.log(formValue)
    }

    SaveCommitment(){
       this.subscribe$.add(
            this.commitmentService.Put(this.commitmentForm.value, this.commitmentForm.value.id)
            .subscribe((res)=>{
                this.notify.Success()
            }, (err)=> {
                this.errorList = err.error.messages;
                this.notify.Error()
            })
       )
    }

    
}
