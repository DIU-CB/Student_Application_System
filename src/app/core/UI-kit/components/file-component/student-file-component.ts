import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { StudentApplicationQueryService } from '../../../serviceModule/StudentApplication/student.application.query';

@Component({
  selector: 'app-file-student-component',
  template: `
        <h4 *ngIf="uploadedFiles || uploadedFiles?.length > 0">Uploaded Image(s) {{uploadedFiles?.length}}</h4>
        <mat-error *ngFor="let msg of uploadedFilesError;">{{msg}}</mat-error>

        <mat-card *ngFor="let doc of uploadedFiles; let i = index;">
            <img style="width: 100%" src="http://{{doc}}"/>
            <mat-card-actions>
                <button mat-button>Preview</button>
                <button mat-button (click)="Delete(doc)">Delete</button>
            </mat-card-actions>
        </mat-card>
  `
})
export class StudentFileComponent implements OnInit {
    @Input()uploadedFiles?:any = [];
    @Input()uploadedFilesError;
    // @Input()studentId: string;
    // @Input()applicationId: string;
    @Output() onDelete? = new EventEmitter();
    constructor(public studentApplicationQueryService: StudentApplicationQueryService,public cdRef:ChangeDetectorRef){}

    

    Delete(_item){
        this.onDelete.emit(_item)
    }

    ngOnInit(){
    }

}
