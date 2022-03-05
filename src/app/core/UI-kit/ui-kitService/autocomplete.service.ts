import { Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeesService } from '../../serviceModule/Employees/employees.service';

export class AutocompleteService {
  @Input()itemControl : FormControl = new FormControl();
  @Input()priamryId : FormControl = new FormControl();
  @Input()priamryKey : string;
  @Input()placeholder? : string = 'Item Name';
  @Input()displayProp?:string = 'itemName';
  @Output()callback? = new EventEmitter();
  searchResult;
  flag;

  @Input() applicationId;
  @Input() orderNo;
  @Input() applicationStatusId;
  constructor() {}

//   ngOnInitService() {
//     this.itemControl.valueChanges
//     //.debounceTime(400)
//     .subscribe( data => {
//       if (data) {
//         this.GetDataOnChange(data)
//       }
        
//     })
//   }

//   GetDataOnChange(data:any){
//     service.Get({Name: data}).subscribe(response => {
//         this.searchResult = response;
//     }, ()=>{
//       this.ResetControl()
//     })
//   }

  ResetControl(){
    this.itemControl.reset()
    this.priamryId.reset()
  }

  GetIsRequired(){
    let _req = false;
    if (this.itemControl) {
      if (this.itemControl.errors) {
        _req = this.itemControl.errors.required;
      } else {
        _req = false;
      }
    }
    return _req;
    
  }

  setToPrimaryId(item?: any) {
   this.priamryId.setValue(item[this.priamryKey]);
   this.callback.emit(item);
  } 


}
