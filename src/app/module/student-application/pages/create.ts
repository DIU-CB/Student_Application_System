import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-student-application-create',
    template: `
        <div>
            <mat-toolbar class="page-toolbar">  
                <mat-toolbar-row>
                    <div class="mat-h4">
                        <a href="#">Dashboard</a> / <a href="#">Student Application</a>
                    </div>
                </mat-toolbar-row>
                <mat-toolbar-row class="page-title">
                    Crate New Application
                </mat-toolbar-row>
            </mat-toolbar>

            <student-application-form (routeBackToParent)="GoToList()"></student-application-form>
            <a mat-mini-fab routerLink="/dashboard/student-application/list" class="ui-float-button">
                <mat-icon aria-label="Example icon-button with a heart icon">list</mat-icon>
            </a>
           
        </div>
    `
  })
  export class StudentApplicationCreateComponent implements OnInit {
  
    constructor(public router:Router) { }
  
    ngOnInit() {
    }

    GoToList(){
        this.router.navigate(['/dashboard/student-application/list']);
    }
  
  }
  