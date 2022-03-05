import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { Observable } from "rxjs";
import { CommonDataQueriesService } from "src/app/core/serviceModule/CommonDataQueries/common-data-queries.service";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";

export class SemesterProgramListInitialize extends UnsubscribeOnDestroyAdapter{
    programList:Observable<Object>;
    semesterList:Observable<Object>;
    constructor(public commonQuery: CommonDataQueriesService
        , public semesterService: SemesterQueryService
        ){
            super();
            this.programList = this.commonQuery.GetProgram();
            this.semesterList = this.semesterService.Get();
        }
    
}