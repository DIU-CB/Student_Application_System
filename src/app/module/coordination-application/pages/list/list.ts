import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApplicationDispatchesQueryService } from "src/app/core/serviceModule/ApplicationDispatches/ApplicationDispatches.Query.service";
import { IXPagination } from "src/app/shared/components/UI-Kit/x-pagination/IxPagination";
import { MediaMatcher } from "@angular/cdk/layout";
import { SubSink } from "subsink";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";


@Component({
    selector: 'app-list-page',
    templateUrl: './list.html',
    styleUrls: ['./list.scss'],
    providers: [ApplicationDispatchesQueryService]
  })

  
  export class ListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
    //private subscribe$ = new SubSink();
    ApplicationList;
    pageSize:string = '10';
    elableLoader:boolean = false;
    xPagination:IXPagination;

    mobileQuery: MediaQueryList;
    public _mobileQueryListener: () => void;
    searchOpen:boolean = false;
    
    constructor(public route : ActivatedRoute, public aqService: ApplicationDispatchesQueryService
      , changeDetectorRef: ChangeDetectorRef
      , media: MediaMatcher) {
        super();
        this.mobileQuery = media.matchMedia('(max-width: 768px)');
        this._mobileQueryListener = () => {
          changeDetectorRef.detectChanges()}
          ;
        this.mobileQuery.addListener(this._mobileQueryListener);
      }
  
    ngOnInit() {
        //this.xpag.PageSize = 2
        this.Search({
          applicationStatusId: "1",
          applicationTypeId: "",
          appliedOnFrom: "",
          campusId: "",
          pageNumber: 1,
          pageSize: "10",
          programId: "",
          semesterId: "",
          shiftId: "",
          studentId: ""
        })
    }
  
    private Success = (res)=>{
        this.elableLoader = false;
        this.ApplicationList = res.body;
        this.xPagination =  JSON.parse(res.headers.get('X-Pagination'));
    }

    Search(_item){
        this.elableLoader = true;
        _item.pageSize = this.pageSize;

        this.subscribe$.add(
          this.aqService.GetXpaging(_item)
            .subscribe(this.Success, ()=> {
              this.elableLoader = false
            })
        )

        this.searchOpen = false
    }

    ngOnDestroy(): void {
      super.ngOnDestroy();
      this.mobileQuery.removeListener(this._mobileQueryListener);
      //this.subscribe$.unsubscribe();
    }


  }
  