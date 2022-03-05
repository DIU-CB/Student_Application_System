import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-student-application-list',
    template: `
        <div>
            <mat-toolbar class="page-toolbar">  
                    List of application(s)
            </mat-toolbar>

            <student-application-list></student-application-list>
            <a mat-mini-fab routerLink="/dashboard/student-application/create" class="ui-float-button">
                <mat-icon aria-label="Example icon-button with a heart icon">add</mat-icon>
            </a>
        </div>
    `
  })

  
  export class StudentApplicationListPageComponent implements OnInit {
    constructor(public route : ActivatedRoute) {  }
  
    ngOnInit() {
        
    }
  
  }
  