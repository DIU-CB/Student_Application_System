import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { MatDialog } from "@angular/material";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { ProcessProtocolsWriteService } from "src/app/core/serviceModule/ProcessProtocols/ProcessProtocols.service.write";
import { ActivatedRoute } from "@angular/router";
import { ProcessProtocolsQueryService } from "src/app/core/serviceModule/ProcessProtocols/ProcessProtocols.query.service";
import { ProgramOfficesQueryService } from "src/app/core/serviceModule/ProgramOffices/ProgramOffices.Query";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";

interface ApplicationType{
    description: string;
    dummyApllicationBody: string
    id: string
    name: string
}

interface Campus{
    id: string
    name: string
}

interface Program extends Campus{
}
interface applicationConcernType extends Campus{}


@Component({
    selector: 'app-process-protocol-form',
    templateUrl: './process-protocol-form.component.html',
    styleUrls: ['./process-protocol-form.component.scss'],
    providers: [CommonDataQueriesService, ProcessProtocolsWriteService, ProgramOfficesQueryService]
})
export class ProcessProtocolFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    processForm:FormGroup;
    // applicationTypes: ApplicationType[];
    campusList: Campus[];
    programList: Program[];
    applicationConcernTypes:applicationConcernType[] = [{id: '1', name: 'To'}, {id: '2', name: 'Through'}];
    errorList;
    
    constructor( private fb: FormBuilder
        , public applicationQuery: ApplicationTypeQueryService
        , private notify: PopNotificationService
        , public commonDataService: CommonDataQueriesService
        , public processProtocolsQryService: ProcessProtocolsQueryService
        , public processProtocolsWriteService: ProcessProtocolsWriteService
        , private route: ActivatedRoute
        , public dialog: MatDialog
        , private programOfficeService: ProgramOfficesQueryService){super()}

    ngOnInit(){

        this.processForm = this.fb.group({
            id: new FormControl(),
            applicationTypeId: ['', Validators.required],
            campusId: new FormControl(""),
            programId: new FormControl("", Validators.required),
            applicationProcessProtocolSubs: this.fb.array([
                // this.addItem()
            ])
        });

        this.subscribe$.add(
            // this.applicationQuery.Get()
            // .subscribe((res:ApplicationType[])=>{
            //     this.applicationTypes = res;
            // }),
            this.commonDataService.GetCampus()
            .subscribe((res:Campus[])=>{
                this.campusList = res;
            }),
            this.commonDataService.GetProgram()
            .subscribe((res:Program[])=>{
                this.programList = res;
            })
        )

        this.subscribe$.add(
            this.route.params.subscribe((prm)=>{
                const _id = prm.id;
                if (_id) {
                    this.subscribe$.add(
                        this.processProtocolsQryService.GetById(_id)
                        .subscribe(result=>{
                            if (result) {
                                result.applicationProcessProtocolSubs.forEach(element => {
                                    element.applicationConcernTypeId = element.applicationConcernTypeId + "";
                                    this.addItem()
                                });
                                this.processForm.patchValue(result)
                            }
                            
                        })
                    )  
                } else {
                    this.addItem()
                }
            })
        )

    }

    SetProgramOffices(){
        // let data = this.processForm.value;
        // if (data.programId && data.campusId) {
        //     this.programOfficeService.Get(data.campusId, data.programId)
        //         .subscribe((res)=>{
        //             if (res.id) {
        //                 console.log(res)
        //                 let control = <FormArray>this.processForm.controls['applicationProcessProtocolSubs']

        //                 for (let index = 0; index < control.length; index++) {
        //                     const element = control.controls[index] as FormGroup;
        //                     element.patchValue({programOfficeId: res.id});
        //                 }

        //             }
        //         })
        // }
        
    }

    applicationProcessProtocolSubsFormGroup(){
        return {
            id: new FormControl(),
            applicationProcessProtocolMainId: new FormControl(),
            applicationConcernTypeId: new FormControl('1'),
            concernedEmployeeId: new FormControl(),
            concernEmployee: new FormControl(""),
            programOfficeId: new FormControl(""),
            orderNo: new FormControl(0)
        }
    }

    addItem(){
        let mainControl = this.processForm;
        let control = <FormArray>mainControl.controls['applicationProcessProtocolSubs'];
        control.push( this.fb.group(this.applicationProcessProtocolSubsFormGroup()) );
     
        let lgn = control.value.length - 1;
        let frmGrp = control.controls[lgn] as FormGroup;
        frmGrp.patchValue({orderNo: lgn + 1})
        return frmGrp;
    }

    Submit(){
        // let formValue = this.applicationForm.value;
        // formValue['applicationBody'] = this.applicationDetails.applicationBody;
        
        // this.subscribe$.add(
        //     this.processProtocolsWriteService.SaveChanges(this.processForm.value, this.processForm.value.id)
        //         .subscribe((res)=>{
        //             this.notify.Success()
        //         }, (err)=> {
        //             this.errorList = err.error.messages;
        //             this.notify.Error() 
        //         })
        // )
        console.log(this.processForm)
    }

    onItemDeleted(_item?) {
        let control = <FormArray>this.processForm.controls['applicationProcessProtocolSubs']
        // let _indx = control.value.findIndex(item => item.concernedEmployeeId === _item.value.concernedEmployeeId);
        control.removeAt(_item);
    }

    


}