import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { StudentFileComponent } from './student-file-component';
import { StudentApplicationQueryService } from 'src/app/core/serviceModule/StudentApplication/student.application.query';

@Component({
  selector: 'app-file-admin-component',
  template: `
        <h4 *ngIf="uploadedFiles || uploadedFiles?.length > 0">Uploaded File(s) {{uploadedFiles?.length}}</h4>
        <mat-error *ngFor="let msg of uploadedFilesError;">{{msg}}</mat-error>

        <div fxLayout="column" fxLayoutGap="10px">
            <mat-card *ngFor="let doc of uploadedFiles; let i = index;">
                <img style="width: 100%" src="http://{{doc}}"/>
                <mat-card-actions>
                    <a mat-button href="http://{{doc}}" target="_blank">Preview</a>
                </mat-card-actions>
            </mat-card>
        </div>
        

  `
})
export class StudentFileAdminComponent extends StudentFileComponent {
    
    constructor(public studentApplicationQueryService: StudentApplicationQueryService,public cdRef:ChangeDetectorRef){ super(studentApplicationQueryService, cdRef) }

}
