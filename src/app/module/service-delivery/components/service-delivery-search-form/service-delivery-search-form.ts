import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { APPLICATION_TYPE_ID, STUDENT_ID ,CAMPUS_ID,SEMESTER_ID} from "src/app/Classes/SearchParams";
import { DateFormatService } from "src/app/shared/service/date-format.service";

@Component({
    selector: 'app-service-delivery-search-form',
    templateUrl: './service-delivery-search-form.html',
    providers: [ApplicationTypeQueryService]
})
export class ServiceDeliverySearchFormComponent implements OnInit{

    searchForm:FormGroup;
    CampusList: any[] = [
        {value: 'C01', viewValue: 'Dhanmondi'},
        {value: 'C02', viewValue: 'Uttara'},
        {value: 'C03', viewValue: 'Permanent'}
      ];

    @Output()GetValue = new EventEmitter();

    applicationTypeList;

    constructor(
        private fb: FormBuilder,
        private dateFormat: DateFormatService,
        private applicationTypes: ApplicationTypeQueryService
        ){}
    ngOnInit(){

        this.searchForm = this.fb.group({
            [APPLICATION_TYPE_ID]: new FormControl(""),
            [STUDENT_ID]: new FormControl(""),
            [CAMPUS_ID]:new FormControl(""),
            [SEMESTER_ID]: new FormControl(""),
            appliedOnFrom: new FormControl(""),
            appliedOnTo: new FormControl("")
            
        })

        this.applicationTypeList = this.applicationTypes.Get();
        
    }

    Submit(){
        this.formatAppliedTime();
        this.GetValue.emit(this.searchForm.value);
    }

    formatAppliedTime(){
        let _dateFrom = this.searchForm.value.appliedOnFrom;
        let _dateTo = this.searchForm.value.appliedOnTo;

        if (_dateFrom) {
            _dateFrom = this.dateFormat.ToYearMonthDate(this.searchForm.value.appliedOnFrom);
            this.searchForm.value.appliedOnFrom = _dateFrom;
        }

        if (_dateTo) {
            _dateTo = this.dateFormat.ToYearMonthDate(this.searchForm.value.appliedOnTo);
            this.searchForm.value.appliedOnTo = _dateTo;
        }
    }

    Reset(){
        this.searchForm.reset({
            [APPLICATION_TYPE_ID]: "",
            [STUDENT_ID]: "",
            [CAMPUS_ID]:"",
            [SEMESTER_ID]: "",
            appliedOnFrom: null,
            appliedOnTo:null
        })
    }

}