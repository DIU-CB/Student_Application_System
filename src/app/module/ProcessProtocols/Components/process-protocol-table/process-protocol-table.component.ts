import { Component, OnInit, Input } from "@angular/core";
import { ProcessProtocolsQueryService } from "src/app/core/serviceModule/ProcessProtocols/ProcessProtocols.query.service";
import { ProcessProtocolsWriteService } from "src/app/core/serviceModule/ProcessProtocols/ProcessProtocols.service.write";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
import { extend } from "webdriver-js-extender";
@Component({
    selector: 'app-process-protocol-table',
    templateUrl: './process-protocol-table.component.html'
})
export class ProcessProtocolTableComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    @Input() listData;
    constructor(private _ppservice: ProcessProtocolsWriteService, private notify: PopNotificationService){super()}
    ngOnInit(){
    }

    Delete(_id, index){
        let isConfirm = confirm('Do you want to delete this?');
        if (isConfirm) {
            this.subscribe$.add(
                this._ppservice.Delete(_id)
                .subscribe((res)=>{
                    window.location.reload()
                }, (err)=>{
                    this.notify.Error('Error!!!')
                })
            )
            
        }
    }


    
}