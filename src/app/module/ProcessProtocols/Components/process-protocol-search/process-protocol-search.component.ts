import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'app-process-protocol-search',
    templateUrl: './process-protocol-search.component.html'
})
export class ProcessProtocolSearchComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    searchForm:FormGroup;
    
    @Output()GetValue = new EventEmitter();

    
    applicationTypeList;
    campusList;
    // FacultyList;
    // CampusList;
    // ShiftList;
    // ProgramList;

    constructor(
        private applicationTypes: ApplicationTypeQueryService,
        private commonQuery: CommonDataQueriesService,
        private fb: FormBuilder
        ){super()}
    ngOnInit(){

        this.searchForm = this.fb.group({
            applicationTypeId: new FormControl(""),
            campusId: new FormControl(""),
            applicationConcernTypeId: new FormControl(""),
            concernedEmployeeId: new FormControl("")
        })

        this.GetInitialDropdownValue();
    }

    Submit(){
        this.GetValue.emit(this.searchForm.value);
    }

    Reset(){
        this.searchForm.reset();
        this.searchForm.patchValue({
            applicationTypeId: "",
            campusId: "",
            applicationConcernTypeId: "",
            concernedEmployeeId: ""
        })
    }

    GetInitialDropdownValue(){
        
        this.subscribe$.add(
            this.commonQuery.GetCampus()
                .subscribe((res)=>{
                    this.campusList = res;
                }),
            this.applicationTypes.Get()
                .subscribe((res)=>{
                    this.applicationTypeList = res;
                })
        )

    }
}