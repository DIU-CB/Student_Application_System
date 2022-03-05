import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
    confirm: boolean;
}

@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
  })
  export class DeleteDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    onConfirm(){
      this.data.confirm = true;
      this.dialogRef.close(this.data.confirm);
    }
  
  }