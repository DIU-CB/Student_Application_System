import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from "@angular/forms";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { StudentApplicationWriteService } from "src/app/core/serviceModule/StudentApplication/student.application.write";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { DeleteDialog } from "src/app/shared/components/UI-Kit/Dialog/delete-dialog/delete-dialog";
import { MatDialog, MatDatepickerModule, DateAdapter } from "@angular/material";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { IApplicationType } from "src/app/Interface/IApplicationType";
import { ICampus } from "src/app/Interface/ICampus";
import { DATE_ONE, DATE_TWO, DATE_THREE, DATE_FOUR, AMOUNT_ONE, AMOUNT_TWO, AMOUNT_THREE, AMOUNT_FOUR, NOTE_ONE, NOTE_TWO, NOTE_THREE, NOTE_FOUR } from "src/app/Classes/CommitmentVeriables";
import { ActivatedRoute, Router } from "@angular/router";
// import { ComplexForm } from "src/app/shared/classes/complex.form";
// import  * as ClassicEditor from "../../../../../../node_modules/@ckeditor/ckeditor5-angular";






@Component({
    selector: 'student-application-form',
    templateUrl: './student-application-form.component.html',
    providers: [
        ApplicationTypeQueryService
        , StudentApplicationWriteService
        , StudentApplicationQueryService
        , SemesterQueryService
    ]
})
export class StudentApplicationFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

    applicationForm: FormGroup;
    applicationTypes:IApplicationType[];
    applicationType:IApplicationType;
    campusList: ICampus[];
    semesterList:any[];
    // applicationDesctiption:string;

    formData:FormData;
    errorMsg:FormData;
    @Input()primaryId?:string;
    imageData:String;
    uploadedFiles:any;
    uploadedFilesError:any;

    @Output() routeBackToParent=new EventEmitter();

    constructor(
        private fb: FormBuilder
        , private applicationQuery: ApplicationTypeQueryService
        , private studentApplicationService: StudentApplicationWriteService
        , private studentApplicationQueryService: StudentApplicationQueryService
        , private notify: PopNotificationService
        , public commonDataService: CommonDataQueriesService
        , public semesterService: SemesterQueryService
        , public dialog: MatDialog
        ,public router:Router
        ,public ActiveRouter:ActivatedRoute
        ) { super() }
  
    ngOnInit() {

        this.applicationForm = this.fb.group({
            id: new FormControl(),
            applicationTypeId: ['', Validators.required],
            applicationBody: ['', Validators.required],
            applicationDesctiption: new FormControl(),
            campusId: new FormControl(""),
            semesterId: new FormControl("", Validators.required),
            paid: new FormControl(null),
            fileUploaded: new FormControl(null),

            files: this.fb.array([
                //this.filesGroup()
            ]),
            appliedOn: new FormControl(),
            createdOn: new FormControl(),
            studentId: new FormControl(),
            rowVersion: new FormControl(),
            applicationStatusId: new FormControl(),
            studentCommitment: this.fb.group({
                // commitment: new FormControl()
                applicationId : new FormControl(),
                [DATE_ONE] : new FormControl(),
                [DATE_TWO] : new FormControl(),
                [DATE_THREE] : new FormControl(),
                [DATE_FOUR] : new FormControl(),
                [AMOUNT_ONE] : new FormControl(),
                [AMOUNT_TWO] : new FormControl(),
                [AMOUNT_THREE] : new FormControl(),
                [AMOUNT_FOUR] : new FormControl(),
                [NOTE_ONE] : new FormControl(),
                [NOTE_TWO] : new FormControl(),
                [NOTE_THREE] : new FormControl(),
                [NOTE_FOUR] : new FormControl(),
            }),
            
            active: new FormControl(false)
        });

        

        

        this.subscribe$.add(
            this.applicationQuery.GetByApplicationTypeByStudentd()
            .subscribe((res:IApplicationType[])=>{
                this.applicationTypes = res;
            }),
            this.commonDataService.GetCampus()
            .subscribe((res:ICampus[])=>{
                this.campusList = res;
            }),

            this.semesterService.Get()
            .subscribe((res:ICampus[])=>{
                this.semesterList = res;
            })
        )

        if (this.primaryId) {
            this.subscribe$.add(
                this.studentApplicationQueryService.GetById(this.primaryId)
                .subscribe((resp:any)=>{
                    // debugger
                    //let res = JSON.parse(resp.jsonData) || {};
                    this.applicationForm.patchValue({
                        id: resp.id,
                        applicationTypeId: resp.applicationTypeId,
                        applicationBody: resp.applicationBody,
                        campusId: resp.campusId,
                        semesterId: resp.semesterId,
                        
                        appliedOn: resp.appliedOn,
                        // createdOn: new FormControl(),
                        studentId: resp.studentId,
                        rowVersion: resp.rowVersion,
                        applicationStatusId: resp.applicationStatusId,
                        paid:resp.paid,
                        fileUploaded:resp.fileUploaded
                    });
                    // debugger;
                    if (resp.studentCommitment) {
                        this.applicationForm.get('studentCommitment')
                            //.get('commitment')
                            .patchValue(resp.studentCommitment)
                    }

                    this.subscribe$.add(
                        this.studentApplicationQueryService.GetFiles(resp['id'], resp['studentId'])
                        .subscribe((fileres)=>{
                            this.uploadedFiles = fileres;
                        }, (err)=>{
                            this.uploadedFilesError = err.error.messages;
                        })
                    )

                })
            )
        }

        this.subscribe$.add(
            this.applicationForm.get('applicationTypeId').valueChanges.subscribe((res)=>{
                if (res) {
                    // debugger
                    this.applicationType = <IApplicationType>this.applicationTypes.filter((app:IApplicationType) => app.id === res)[0]// this.Filter(this.applicationTypes, res)[0];
                    // this.applicationDesctiption = dropdownItem.description;
                    this.applicationForm.patchValue({
                        // //applicationTypeId: res.id,
                        applicationDesctiption: this.applicationType.description,
                        applicationBody: this.applicationType.dummyApllicationBody,
                        // //active: this.applicationType.active
                    })

                    this.UpdateValidator(this.applicationForm.get(DATE_ONE));
                    this.UpdateValidator(this.applicationForm.get(AMOUNT_ONE));
                }
                // console.log(this.applicationForm.get(DATE_ONE).status)
                
            })
        )

    }

    messageForApplicationFee="";

    onApplicationType(){
        //console.log(this.applicationForm.get('applicationTypeId').value);
        this.messageForApplicationFee="";
        let applicationFee=this.applicationTypes.find(c=>c.id==this.applicationForm.get('applicationTypeId').value).applicationFee;
        if(applicationFee!=null){
            //console.log(this.applicationTypes.find(c=>c.id==this.applicationForm.get('applicationTypeId').value).applicationFee);
            
            this.applicationForm.patchValue({
                paid:false,
                fileUploaded:false,
                semesterId:this.semesterList[0].id,
                campusId:this.campusList[2].id
            });
            //console.log( this.applicationForm.value);
            this.messageForApplicationFee=`You  must pay ${applicationFee} taka to complete the application process`;

        }else{
            //console.log( this.applicationForm.value);
            this.applicationForm.patchValue({
                paid:null,
                fileUploaded:null
            });
        }
    }


    UpdateValidator(input:AbstractControl){
        if (input) {
            input.setValidators(this.applicationType.commitmentRequired ? [Validators.required] : null);
            input.updateValueAndValidity();   
        }
    }

    // UpdateValidatorsToCommitment(){
    //     let mainForm = this.applicationForm;
    //     const appId = mainForm.get('applicationTypeId').value;
    //     let control = <FormArray>mainForm.controls['studentCommitment']['controls'];
        
    //     if (control.length) {
    //         for (let i = 0; i < control.length; i++) {
    //             let element = control[i] as FormGroup;
                
    //             if (appId == "9999") {
    //                 element.get('commitment').setValidators([Validators.required])
    //             } else {
    //                 element.get('commitment').clearValidators();
    //             }
    //             element.get('commitment').updateValueAndValidity();
                
    //         }    
    //     }
    // }

    

    fileChange(event) {
        let fileList: FileList = event.target.files;
        var promise = new Promise(function(resolve, reject) {
            /* missing implementation */
            if(fileList.length > 0) {
                debugger
                let file: File = fileList[0];
                if (file.size >= 512000) {
                    reject(new Error("File size is greater then 500kB"));
                }
                const reader = new FileReader();
                reader.onerror = () => {
                    reader.abort();
                    reject(new Error("Error reading file."));
                };
                
                reader.addEventListener("load", () => {
                    resolve(reader.result);
                }, false);
                reader.readAsDataURL(file);
            }

            
          });

          return promise;
        
    }

    SelectFile(_event, i){
        this.fileChange(_event)
        .then((res)=>{
            let control = this.applicationForm.controls['files']['controls'] as FormArray;
            let controlGrp = control[i] as FormGroup;
            controlGrp.patchValue(res)
        }, (err)=>{
            this.notify.Error(err.message);
        })
    }

    filesGroup(){
        return new FormControl('', Validators.required);
    }
    

    addItem():void{
        let mainControl = this.applicationForm;
        let control = <FormArray>mainControl.controls['files'];
        control.push(this.filesGroup());
    }

    onItemDeleted(index) {
        let control = <FormArray>this.applicationForm.controls.files
        control.removeAt(index);
    }

    Submit(){
        //console.log(this.applicationForm.value)
        
        // this.errorMsg = null;
        this.subscribe$.add(
            this.studentApplicationService.SaveChanges(this.applicationForm.value, this.applicationForm.value.id)
            .subscribe((res)=>{
                // debugger
                //this.notify.Success();
                //this.router.navigate[('dashboard/student-application/list')];
                this.notify.Success();
                this.routeBackToParent.emit();
                
                

            }, (err)=>{
                console.log(err)
                // debugger
                this.errorMsg = err.error.messages;
                if(err.status==201){
                    this.notify.Success();
                    
                    this.routeBackToParent.emit();
                }
                else{
                    console.log(err)
                    this.notify.Error();
                }
                
                
            })
        )
    }

    Check(){
        console.log(this.applicationForm.get('dateOne'))
    }

    DeleteDialog(item:any): void {
        const dialogRef = this.dialog.open(DeleteDialog, {
          width: '300px',
          data: {confirm: false}
        });
    
        this.subscribe$.add(
            dialogRef.afterClosed().subscribe(result => {
                //console.log('The dialog was closed');
                if (result) {
                  this.Delete(this.applicationForm.value.id, item);
                }
                //console.log(result)
              })
        )
        //console.log(item)
      }

      Delete(id:string, item:any){
        let img = item;
        let sImage = img.split('/')
        let fileName = sImage[sImage.length - 1];

        this.subscribe$.add(
            this.studentApplicationService.DeleteFile(id, fileName)
            .subscribe((res)=>{
                this.notify.Success('Deleted Successfully!!!');
                this.ngOnInit();
            })
        )
      }
    
      RemoveFromList(list, item){
        var index;
          while ((index = list.indexOf(item)) > -1) {
          list.splice(index, 1);
          index++;
        }
      }
  
  }