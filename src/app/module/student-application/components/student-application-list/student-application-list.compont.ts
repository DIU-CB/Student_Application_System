import { Component, OnInit } from "@angular/core";
import { StudentApplicationQueryService } from "src/app/core/serviceModule/StudentApplication/student.application.query";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DeleteDialog } from "src/app/shared/components/UI-Kit/Dialog/delete-dialog/delete-dialog";
import { MatDialog, MatSnackBar } from "@angular/material";
import { StudentApplicationWriteService } from "src/app/core/serviceModule/StudentApplication/student.application.write";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";


@Component({
    selector: 'student-application-list',
    templateUrl: './student-application-list.component.html'
})


export class StudentApplicationListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
    studentApplicationList;
    confirm:boolean = false;
    elableLoader:boolean = false;
    constructor(public dialog: MatDialog
        , public studentApplicationSerivce: StudentApplicationQueryService
        , public studentApplicationWriteSerivce: StudentApplicationWriteService
        , public notify: PopNotificationService
        ) { super() }
  
    ngOnInit() {
      this.elableLoader = true;
        this.subscribe$.add(
          this.studentApplicationSerivce.Get()
          .subscribe((res)=>{
              this.studentApplicationList = res;
              this.elableLoader = false
          },(err)=>{
            this.elableLoader = false
          })
        )
    }

    DeleteDialog(item:any): void {
        const dialogRef = this.dialog.open(DeleteDialog, {
          width: '300px',
          data: {confirm: false}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed');
          this.confirm = result;
          if (this.confirm) {
            this.Delete(item.id, item);
          }
          //console.log(result)
        });
      }
    
      Delete(id:string, item:any){
        let _notify = this.notify;
        this.studentApplicationWriteSerivce.Delete(id)
          .subscribe((res)=>{
            //debugger
            //if (res) {
              this.RemoveFromList(this.studentApplicationList, item)
                .then(function(res){
                  if (res) {
                    _notify.Success(item.applicationType.name +' - Deleted successfully!!!');
                  }
                })
              
            //}
            
          })
      }
    
      RemoveFromList(list, item){
        let promise = new Promise(function(resolve, reject){
            var index;
            while ((index = list.indexOf(item)) > -1) {
              list.splice(index, 1);
              index++;
            }
            resolve(true)
            reject(false)
        })
        return promise;
      }
  
}

