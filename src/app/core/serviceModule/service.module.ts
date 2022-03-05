import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ApplicationTypeQueryService } from "./ApplicationType/application-type-queries.query";
import { StudentApplicationWriteService } from "./StudentApplication/student.application.write";
import { StudentApplicationQueryService } from "./StudentApplication/student.application.query";
import { FileQueryService } from "./Files/files.query";
import { ApplicationQueryService } from "./ApplicationQueries/ApplicationQueries.service";
import { EmployeesService } from "./Employees/employees.service";
import { ApplicationDispatchesService } from "./ApplicationDispatches/ApplicationDispatches.service";
import { CommonDataQueriesService } from "./CommonDataQueries/common-data-queries.service";
import { StudentDueAndCgpaSummariesQueryService } from "./StudentDueAndCgpaSummaries/student-due-and-cgpa-summaries.query.service";
import { ApplicationPreceedingsWriteService } from "./ApplicationPreceedings/ApplicationPreceedings.write.service";
import { ApplicationTypesWriteService } from "./ApplicationType/application-types.write.service";
import { ServiceDeliveriesWriteService } from "./ServiceDeliveries/service-deliveries.wire.service";
import { ApplicationPreceedingsQueryService } from "./ApplicationPreceedings/ApplicationPreceedings.query.service";
import { ApplicationDispatchesQueryService } from "./ApplicationDispatches/ApplicationDispatches.Query.service";
import { ApplicationConcernsQueryService } from "./ApplicationConcerns/ApplicationConcerns.query.service";
import { MentorsQueryService } from "./Mentors/Mentors.query";
import { ApplicationCounterQueryService } from "./ApplicationCounter/ApplicationCounter.query.service";
import { ProcessProtocolsQueryService } from "./ProcessProtocols/ProcessProtocols.query.service";
import { ProcessProtocolsWriteService } from "./ProcessProtocols/ProcessProtocols.service.write";
import { SemesterQueryService } from "./SemesterService/semester-query.service";
import { DuesQueryService } from "./Dues/dues.service.Query";
import { ProgramOfficesQueryService } from "./ProgramOffices/ProgramOffices.Query";

const _exportableModule = [
    HttpClientModule
]

@NgModule({
    declarations: [],
    imports: [
      CommonModule
      , _exportableModule
    ]
    , providers: [
        ApplicationTypeQueryService,
        ApplicationTypesWriteService,
        ApplicationPreceedingsWriteService,
        ApplicationPreceedingsQueryService,
        StudentApplicationWriteService,
        StudentApplicationQueryService,
        FileQueryService,
        ApplicationQueryService,
        EmployeesService,
        ApplicationDispatchesService,
        CommonDataQueriesService,
        StudentDueAndCgpaSummariesQueryService,
        ServiceDeliveriesWriteService,
        ServiceDeliveriesWriteService,
        ApplicationDispatchesQueryService,
        ApplicationConcernsQueryService,
        MentorsQueryService,
        ApplicationCounterQueryService,
        ProcessProtocolsQueryService,
        ProcessProtocolsWriteService,
        SemesterQueryService,
        DuesQueryService,
        ProgramOfficesQueryService
    ]
    , exports: [
        _exportableModule
    ]
  })
  export class ServiceModule { }