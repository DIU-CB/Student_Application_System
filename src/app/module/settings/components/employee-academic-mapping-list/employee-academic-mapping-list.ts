import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeAcademicMappingsQueryService } from "src/app/core/serviceModule/EmployeeAcademicMappings/employee-academic-mappings.service.query";
import { EmployeeAcademicMappingsWriteService } from "src/app/core/serviceModule/EmployeeAcademicMappings/employee-academic-mappings.service.write";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { ActivatedRoute } from "@angular/router";
import { OnInit, Component } from "@angular/core";
import { DeleteDialog } from "src/app/shared/components/UI-Kit/Dialog/delete-dialog/delete-dialog";
import { MatDialog } from "@angular/material";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";

@Component({
    selector: 'employee-academic-mapping-list',
    templateUrl: './employee-academic-mapping-list.html',
    providers: [EmployeeAcademicMappingsQueryService, EmployeeAcademicMappingsWriteService]
})
export class EmployeeAcademicMappingListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    mappingList;
    elableLoader:boolean = false;
    constructor(
        private fb: FormBuilder
        , private emplMapQry: EmployeeAcademicMappingsQueryService
        , private emplMapWrite: EmployeeAcademicMappingsWriteService
        , private notify: PopNotificationService
        , private route: ActivatedRoute
        , private dialog: MatDialog
        ){super()}

    ngOnInit(){
        this.elableLoader = true;
        this.subscribe$.add(
            this.emplMapQry.Get()
            .subscribe((res)=>{
                this.mappingList = res;
                this.elableLoader = false
            }, ()=> this.elableLoader = false)
        )

    }

    

}