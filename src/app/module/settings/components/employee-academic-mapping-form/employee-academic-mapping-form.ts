import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { ApplicationTypesWriteService } from "src/app/core/serviceModule/ApplicationType/application-types.write.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { ActivatedRoute } from "@angular/router";
import { EmployeeAcademicMappingsQueryService } from "src/app/core/serviceModule/EmployeeAcademicMappings/employee-academic-mappings.service.query";
import { EmployeeAcademicMappingsWriteService } from "src/app/core/serviceModule/EmployeeAcademicMappings/employee-academic-mappings.service.write";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'employee-academic-mapping-form',
    templateUrl: './employee-academic-mapping-form.html',
    providers: [
        EmployeeAcademicMappingsQueryService
        , EmployeeAcademicMappingsWriteService
        , CommonDataQueriesService
    ]
})
export class EmployeeAcademicMappingFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    ProgramList;
    RoleList;
    applicationTypeList;
    FacultyList;
    ShiftList;
    CampusList;


    mappingForm:FormGroup;
    
    errorList;

    constructor(
        private fb: FormBuilder
        , private emplMapQry: EmployeeAcademicMappingsQueryService
        , private emplMapWrite: EmployeeAcademicMappingsWriteService
        , private notify: PopNotificationService
        , private route: ActivatedRoute
        , private commonQuery: CommonDataQueriesService
        , private applicationTypes: ApplicationTypeQueryService
        ){super()}

    ngOnInit(){
            this.mappingForm = this.fb.group(
                this.MappingFormGroup()
            );
        this.subscribe$.add(
            this.commonQuery.GetProgram()
                .subscribe((res)=>{
                    this.ProgramList = res;
                }),
    
            this.commonQuery.GetRole()
                .subscribe((res)=>{
                    this.RoleList = res;
                }),
    
            this.applicationTypes.Get()
                .subscribe((res)=>{
                    this.applicationTypeList = res;
                }),
    
            this.commonQuery.GetFaculty()
                .subscribe((res)=>{
                    this.FacultyList = res;
                }),
    
            this.commonQuery.GetShift()
                .subscribe((res)=>{
                    this.ShiftList = res;
                }),
    
            this.commonQuery.GetCampus()
                .subscribe((res)=>{
                    this.CampusList = res;
                })
        )


            this.subscribe$.add(
                this.route.params.subscribe((_params)=>{
                    // debugger
                    if (_params.id) {
                        this.subscribe$.add(
                            this.emplMapQry.GetById(_params.id)
                            .subscribe((res)=>{
                                this.mappingForm.patchValue(res);
                            })
                        )
                    }
                    
                })
            )

        this.subscribe$.add(
            this.mappingForm.get('roleId').valueChanges.subscribe((res)=> {
                // debugger
                
                if (res) {
                    let role = this.RoleList.filter(app => app.id === res);
                    this.mappingForm.patchValue({
                        roleName: role[0].name
                    })
                    // this.mappingForm.get('roleId').patchValue(res.id)
                    // this.mappingForm.get('roleName').patchValue(res.name)
                }
            })
        )


    }
    MappingFormGroup(){
        return {
            id: new FormControl(),
            employeeId: new FormControl("", Validators.required),
            employee: new FormControl("", Validators.required),
            programId: new FormControl(),
            roleId: new FormControl(),
            roleName: new FormControl(),
            applicationTypeId: new FormControl(),
            facultyId: new FormControl(),
            shiftId: new FormControl(),
            campusId: new FormControl(),
            isActive: new FormControl(true),
            canDoAnything: new FormControl(false)
        }
    }

    

    Submit(){
        
        this.subscribe$.add(
            this.emplMapWrite.SaveChanges(this.mappingForm.value, this.mappingForm.value.id)
            .subscribe((res)=>{
                this.notify.Success();
            }, (err)=>{
                this.notify.Error();
                this.errorList = err.error.messages;
            })
        )
    }



}