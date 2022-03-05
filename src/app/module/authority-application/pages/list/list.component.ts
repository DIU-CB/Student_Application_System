import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { ApplicationQueryService } from "src/app/core/serviceModule/ApplicationQueries/ApplicationQueries.service";
import { ApplicationPreceedingsQueryService } from "src/app/core/serviceModule/ApplicationPreceedings/ApplicationPreceedings.query.service";
import { MediaMatcher } from "@angular/cdk/layout";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";

@Component({
    selector: 'app-list-page',
    templateUrl: './list.html',
    styleUrls: ['./list.scss']
    , providers: [ApplicationPreceedingsQueryService]
  })

  
  export class ListComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy {
    ApplicationList;
    pageSize:string = '10';
    xPagination:any;
    enableLoader:boolean = false;

    mobileQuery: MediaQueryList;
    public _mobileQueryListener: () => void;
    searchOpen:boolean = false;;

    constructor(
        // public route : ActivatedRoute
        public aqService: ApplicationPreceedingsQueryService
        , public changeDetectorRef: ChangeDetectorRef
      , media: MediaMatcher) {
        super();
        this.mobileQuery = media.matchMedia('(max-width: 600px)');

        
        // console.log(this.mobileQuery)
        this._mobileQueryListener = () => {
          // if (this.mobileQuery.matches) {
          //   this.opened = false;
          // } else {
          //   this.opened = true;
          // }
          changeDetectorRef.detectChanges()
        };
        this.mobileQuery.addListener(this._mobileQueryListener);
      };
  
    ngOnInit() {
      // this._mobileQueryListener = () => {
      //   if (this.mobileQuery.matches) {
      //     this.opened = false;
      //   } else {
      //     this.opened = true;
      //   }
      //   this.changeDetectorRef.detectChanges()
      // };
      // this.mobileQuery.addListener(this._mobileQueryListener);
      this.Search({
        applicationStatusId: "6",
        applicationTypeId: "",
        campusId: "",
        pageNumber: 1,
        pageSize: 10,
        programId: "",
        semesterId: "",
        shiftId: ""
      })
    }

    public Success = (res)=>{
        this.ApplicationList = res.body;
        this.xPagination =  JSON.parse(res.headers.get('X-Pagination'));
        this.enableLoader = false;
    }

    Search(_item){
        this.enableLoader = true;
        _item.pageSize = this.pageSize;
        this.subscribe$.add(
          this.aqService.GetXpaging(_item)
            .subscribe(this.Success, (err)=>{
                this.enableLoader = true;
            })
        )
        this.searchOpen = false;
    }

    ngOnDestroy(){
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  
  }