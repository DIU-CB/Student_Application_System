import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ApplicationTypeQueryService } from "src/app/core/serviceModule/ApplicationType/application-type-queries.query";
import { DeleteDialog } from "src/app/shared/components/UI-Kit/Dialog/delete-dialog/delete-dialog";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { ApplicationTypesWriteService } from "src/app/core/serviceModule/ApplicationType/application-types.write.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/service/unsubscribe-on-destroy-adapter";
@Component({
    selector: 'app-application-type-list',
    templateUrl: './application-type-list.html'
})
export class ApplicationTypeListComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
    applicationTypeList;
    confirm:boolean = false;
    elableLoader:boolean = false;

    constructor(public dialog: MatDialog
        , private applicationTypeQueryService: ApplicationTypeQueryService
        , private applicationTypeWriteService: ApplicationTypesWriteService
        , public notify: PopNotificationService
        ) { super() }
  
    ngOnInit() {
      this.elableLoader = true;
      this.subscribe$.add(
        this.applicationTypeQueryService.Get()
          .subscribe((res)=>{
              //setTimeout(()=>{
                this.applicationTypeList = res;
                this.elableLoader = false;
              //}, 2000)
          }, ()=>{
            this.elableLoader = false;
          })
      )
    }

    DeleteDialog(item:any): void {
        const dialogRef = this.dialog.open(DeleteDialog, {
          width: '300px',
          data: {confirm: false}
        });
    
        this.subscribe$.add(
          dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            this.confirm = result;
            if (this.confirm) {
              this.Delete(item.id, item);
            }
            //console.log(result)
          })
        )
      }
    
      Delete(id:string, item:any){
        let _notify = this.notify;
        this.subscribe$.add(
          this.applicationTypeWriteService.Delete(id)
          .subscribe((res)=>{
            //debugger
            //if (res) {
              this.RemoveFromList(this.applicationTypeList, item)
                .then(function(res){
                  if (res) {
                    _notify.Success(item.applicationType.name +' - Deleted successfully!!!');
                  }
                })
              
            //}
            
          })
        )
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