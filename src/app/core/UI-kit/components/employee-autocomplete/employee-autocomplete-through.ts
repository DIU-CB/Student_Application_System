import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from 'src/app/core/serviceModule/Employees/employees.service';
import { EmployeeAutocompleteToComponent } from './employee-autocomplete-to';
import { IEmployee } from 'src/app/Interface/IEmployee';
import { TokenService } from 'src/app/core/authentication/Services/token.service';
import { ApplicationConcernsUpdateService } from "src/app/core/serviceModule/ApplicationConcerns/application-concerns-update.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";


@Component({
  selector: 'app-employee-autocomplete-through',
  templateUrl: './employee-autocomplete-to.html',
  styles: [
    `.input-full-width{ width: 100%;}`
  ],
  providers: [EmployeesService]
})
export class EmployeeAutocompleteThroughComponent extends EmployeeAutocompleteToComponent implements OnInit {

  

  constructor(public service: EmployeesService,public concernUpdateService:ApplicationConcernsUpdateService, public token: TokenService,private notify: PopNotificationService) {
    super(service)
  }

  ngOnInit() {
    this.itemControl.valueChanges
    .subscribe( data => {
      
      if (data) {
        this.service.Through(data).subscribe((response:IEmployee[]) => {
            this.searchResult = this.GetEmployeeExcept(response);
            this.flag=0;
            //console.log(this.itemControl);
            
           var order =this.orderNo||1;
           this.orderNo=order;

           
           // console.log(this.applicationStatusId.value);
           //  console.log(this.orderNo.value);

        }, ()=>{
          this.ResetControl()
          this.flag=1;
        })
      }
        
    })

    // console.log(this.orderNo);
    // console.log(this.applicationId);
    // console.log(this.itemControl);

  }

  GetEmployeeExcept(Employees:IEmployee[]){
    const currentUserId = this.token.getUserToken().id;
    //710000041=Jamil Vai
    //710000664=Reg. Sir
    const jamil = "710000041";
    const RegistrarSir = "710000664";
    if (currentUserId == jamil) {
      return Employees;
    } else {
      return Employees.filter(item => {return item.id != RegistrarSir})
    }
    
  }

  UpdateConcern(){
  

 if(this.applicationId.value!=null && this.orderNo.value !=null && this.itemControl.value.id!=null)
    this.concernUpdateService.updateConcern(this.applicationId.value,this.orderNo.value,this.itemControl.value.id)
    .subscribe((res)=>{
      this.notify.Success()
      this.UpdateJson();
      this.flag=1;
      }, (err)=> {
      
      this.notify.Error()
       }
       
    );
 
   // console.log(this.applicationId);
    // console.log(this.orderNo);
    // console.log(this.itemControl.value.id);
  }



  UpdateJson(){
    this.concernUpdateService.updateJsonForUpdateConcern(this.applicationId.value).subscribe();
  }



}
