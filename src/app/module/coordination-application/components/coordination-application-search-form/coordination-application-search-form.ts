import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DateFormatService } from "src/app/shared/service/date-format.service";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";

@Component({
    selector: 'app-coordination-application-search-form',
    templateUrl: './coordination-application-search-form.html',
    providers: [DateFormatService, SemesterQueryService]
})
export class CoordinationApplicationSearchFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

    searchForm:FormGroup;
    searchOptionShow:boolean = false;
    @Output()GetValue = new EventEmitter();

    

    constructor(
        public applicationTypesService: ApplicationTypeQueryService,
        public commonQuery: CommonDataQueriesService,
        private fb: FormBuilder,
        private dateFormat: DateFormatService,
        public semesterService: SemesterQueryService
        ){super()}
    ngOnInit(){

        this.searchForm = this.fb.group({
            applicationTypeId: new FormControl(""),
            applicationStatusId: new FormControl("1"),
            appliedOnFrom: new FormControl(""),
            studentId: new FormControl(""),
            semesterId: new FormControl(""),
            programId: new FormControl(""),
            campusId: new FormControl(""),
            shiftId: new FormControl(""),
            pageNumber: new FormControl(1),
            pageSize: new FormControl(10)
        })

        //this.GetInitialDropdownValue();
    }

    Submit(){
        let _date = this.searchForm.value.appliedOnFrom;
        if (_date) {
            _date = this.dateFormat.ToYearMonthDate(this.searchForm.value.appliedOnFrom)
            this.searchForm.value.appliedOnFrom = _date;
        }
        this.GetValue.emit(this.searchForm.value);
    }

    Reset(){
        this.searchForm.reset();
        this.searchForm.patchValue({
            applicationTypeId: "",
            applicationStatusId: "",
            appliedOnFrom: "",
            studentId: "",
            semesterId: "",
            programId: "",
            pageNumber: 1,
            pageSize: 10
        })
    }

}