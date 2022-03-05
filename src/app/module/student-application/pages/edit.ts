import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";

export class EditBaseComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
    pageTitle:string = 'Product Costing Update';
    primaryId:string;
    //pathName:string;
    constructor(
        public route : ActivatedRoute
    ) { super() }

    ngOnInit() {
        this.subscribe$.add(
            this.route.params.subscribe(params => {
                this.primaryId = params['id'];
            })
        )
    }

    // ngOnDestroy() {
    //     this.sub.unsubscribe();
    // }
  
  }


@Component({
    selector: 'app-student-application-edit',
    template: `
        <div>
            <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Student Application</a>
                    </div>
                </mat-toolbar-row>
                <mat-toolbar-row class="page-title">
                    Application Edit
                </mat-toolbar-row>
            </mat-toolbar>

            <student-application-form [primaryId]="applicationId"></student-application-form>
            <a mat-mini-fab routerLink="/dashboard/student-application/list" class="ui-float-button">
                <mat-icon aria-label="Example icon-button with a heart icon">list</mat-icon>
            </a>
        </div>
    `
    , providers: [StudentApplicationQueryService]
  })

  
  export class StudentApplicationEditComponent extends EditBaseComponent implements OnInit {
    @Input()applicationId:string;
    constructor(public route : ActivatedRoute) { super(route) }
  
    ngOnInit() {
        super.ngOnInit();
        this.applicationId = this.primaryId;
    }
  
  }
  