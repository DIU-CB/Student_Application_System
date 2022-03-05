import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: 'app-student-commitment-list',
    template: `
        <div>
            <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Student Application</a>
                    </div>
                </mat-toolbar-row>
                <mat-toolbar-row class="page-title">
                    List of Commitment(s)
                </mat-toolbar-row>
            </mat-toolbar>

            <student-commitment-list></student-commitment-list>
            <!--
            <a mat-mini-fab routerLink="/dashboard/student-application/create" class="ui-float-button">
                <mat-icon aria-label="Example icon-button with a heart icon">add</mat-icon>
            </a>
            -->
        </div>
    `
  })

  
  export class StudentCommitmentListPageComponent implements OnInit {
    constructor(public route : ActivatedRoute) {  }
  
    ngOnInit() {
        
    }
  
  }
  