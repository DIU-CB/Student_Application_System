import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { forkJoin, combineLatest, Observable } from "rxjs";
@Component({
    selector: 'app-authority-application-search-form',
    templateUrl: './authority-application-search-form.html',
    providers: [ApplicationTypeQueryService]
})
export class AuthorityApplicationSearchFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

    searchForm:FormGroup;

    @Output()GetValue = new EventEmitter();

    // StatusList:Observable<any>;
    // applicationTypeList:Observable<any>;
    // programList:Observable<any>;
    // semesterList:Observable<any>;
    // campusList:Observable<any>;
    // shiftList:Observable<any>;

    constructor(
        public commonQuery: CommonDataQueriesService,
        private fb: FormBuilder,
        public applicationTypes: ApplicationTypeQueryService,
        public semesterService: SemesterQueryService
        ){super()}
    ngOnInit(){

        this.searchForm = this.fb.group({
            applicationStatusId: new FormControl(""),
            applicationTypeId: new FormControl(""),
            semesterId: new FormControl(""),
            programId: new FormControl(""),
            campusId: new FormControl(""),
            shiftId: new FormControl(""),
            pageNumber: new FormControl(1),
            studentId: new FormControl(""),
            pageSize: new FormControl(10)
        })

        // this.StatusList = this.commonQuery.GetStatus();
        // this.applicationTypeList = this.applicationTypes.Get();
        // this.programList = this.commonQuery.GetProgram();
        // this.semesterList = this.semesterService.Get();
        // this.campusList = this.commonQuery.GetCampus();
        // this.shiftList = this.commonQuery.GetShift();

        //this.GetInitialDropdownValue();
        let getDropdown = combineLatest(this.commonQuery.GetStatus(), this.applicationTypes.Get());
        getDropdown.subscribe(res=>{
            console.log(res);
        })

        this.searchForm.get('applicationStatusId').patchValue("6")
    }

    Submit(){
        this.GetValue.emit(this.searchForm.value);
    }

    Reset(){
        this.searchForm.reset({
            applicationStatusId: ""
            , applicationTypeId: ""
            , semesterId: ""
            , programId: ""
            , pageNumber: 1
            , pageSize: 10
        })
    }

    //GetInitialDropdownValue(){
        //this.subscribe$.add(
            // this.commonQuery.GetStatus()
            //     .subscribe((res)=>{
            //         this.StatusList = res;
            //     }),
            // this.applicationTypes.Get()
            //         .subscribe((res)=>{
            //             this.applicationTypeList = res;
            //         }),
            // this.commonQuery.GetProgram()
            //     .subscribe((res)=>{
            //             this.programList = res;
            //         }),
            // this.semesterService.Get()
            //     .subscribe((res)=>{
            //             this.semesterList = res;
            //         }),
            // this.commonQuery.GetShift()
            //     .subscribe((res)=>{
            //             this.shiftList = res;
            //         }),
            // this.commonQuery.GetCampus()
            //     .subscribe((res)=>{
            //             this.campusList = res;
            //         })
        //)
    //}

}