import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ProcessProtocolsQueryService } from "src/app/core/serviceModule/ProcessProtocols/ProcessProtocols.query.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";


@Component({
    selector: 'app-list-page',
    templateUrl: './list.html',
    styleUrls: ['./list.scss'],
    providers: [ProcessProtocolsQueryService]
  })

  
  export class ListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
    
    protocolList;
    
    constructor(public processProtocolService: ProcessProtocolsQueryService){super()}
    ngOnInit(){
      this.Search()
    }

    Search(_items?){
      this.subscribe$.add(
        this.processProtocolService.Get(_items)
            .subscribe(res=>{
                this.protocolList = res;
            })
      )
    }


  }
  