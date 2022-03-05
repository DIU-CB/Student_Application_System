import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DuesQueryService } from "src/app/core/serviceModule/Dues/dues.service.Query";
import { PrintService } from "src/app/shared/Print/print.service";
import { Observable } from "rxjs";
import { STUDENT_ID, PROGRAM_ID, SEMESTER_ID, CAMPUS_ID } from "src/app/Classes/SearchParams";
import { SemesterProgramListInitialize } from "../../Classes/SemesterCampusListInitialize";


@Component({
    selector: 'app-due-collection-page',
    templateUrl: './due-collection.page.component.html',
    providers: [CommonDataQueriesService, SemesterQueryService, DuesQueryService, PrintService]
})


export class DueCollectionPageComponent extends SemesterProgramListInitialize implements OnInit, OnDestroy{

    campusList:Observable<Object>;
    ReportList;
    searchForm:FormGroup;
    
    constructor(
        public commonQuery: CommonDataQueriesService
        , public semesterService: SemesterQueryService
        , private fb: FormBuilder
        , public dueService: DuesQueryService
        , public print: PrintService
        ){
            super(commonQuery, semesterService);
        }

    
    
    ngOnInit(){
        // console.log('start init')
        this.searchForm = this.fb.group({
            [STUDENT_ID] : new FormControl(""),
            [PROGRAM_ID] : new FormControl(""),
            [SEMESTER_ID] : new FormControl(""),
            [CAMPUS_ID] : new FormControl("")
        })
        
        this.campusList = this.commonQuery.GetCampus();
        
        //this.subscribe$.add(

            // this.commonQuery.GetProgram()
            // .subscribe((res)=>{
            //     this.programList = res;
            // }),

            // this.semesterService.Get()
            // .subscribe((res)=>{
            //     this.semesterList = res;
            // }),

            // this.commonQuery.GetCampus()
            // .subscribe((res)=>{
            //     this.campusList = res;
            // })
        //)
                
        this.Search()
    }

    Search(){
        //this.ReportList = this.dueService.Get(this.searchForm.value)
        this.subscribe$.add(
            this.dueService.Get(this.searchForm.value)
            .subscribe((res)=>{
                this.ReportList = res;
            })
        )
    }
    Reset(){
        this.searchForm.reset({
            [STUDENT_ID]: '',
            [PROGRAM_ID]: '',
            [SEMESTER_ID]: '',
            [CAMPUS_ID]: ''
        })
    }
    
    
}