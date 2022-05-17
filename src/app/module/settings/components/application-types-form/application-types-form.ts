import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ApplicationTypesWriteService } from "src/app/core/serviceModule/ApplicationType/application-types.write.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { ActivatedRoute } from "@angular/router";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { SubSink } from "subsink";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'app-application-types-form',
    templateUrl: './application-types-form.html',
    providers: [ApplicationTypesWriteService]
})
export class ApplicationTypesFormComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy{
    applicationTypeForm:FormGroup;
    errorList;
    constructor(
        private fb: FormBuilder
        , private applicationTypeService: ApplicationTypesWriteService
        , private applicationTypeReadService: ApplicationTypeQueryService
        , private notify: PopNotificationService
        , private route: ActivatedRoute
        ){super()}

    ngOnInit(){
        this.applicationTypeForm = this.fb.group({
            id: new FormControl(),
            name: new FormControl("", Validators.required),
            description: new FormControl(),
            dummyApllicationBody: new FormControl(),
            applicationToAddressing: new FormControl("", Validators.required),
            active: new FormControl(true, Validators.required),
            commitmentRequired: new FormControl(false, Validators.required),
            applicationFee: new FormControl(null),
            applicationFor:new FormControl(null)
        })

        //if (this.route.params) {
            this.subscribe$.add(
                this.route.params.subscribe((_params)=>{
                    if (_params && _params.id) {
                        this.subscribe$.add(
                            this.applicationTypeReadService.GetById(_params.id)
                            .subscribe((res)=>{
                                this.applicationTypeForm.patchValue(res);
                            })
                        )
                    }
                    
                })
            ) 
            
        //}

    }

    Submit(){
        this.subscribe$.add(
            this.applicationTypeService.SaveChanges(this.applicationTypeForm.value, this.applicationTypeForm.value.id)
            .subscribe((res)=>{
                this.notify.Success();
            }, (err)=>{
                this.notify.Error();
            })
        )
        
    }

    setApplicationFee(amount){
        if(amount=='Alumni')
        this.applicationTypeForm.patchValue({
            applicationFee:50
        })
        else{
            this.applicationTypeForm.patchValue({
                applicationFee:null
            })
        }
        console.log(amount);
        console.log(this.applicationTypeForm.value);
    }

}