import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from 'src/app/core/serviceModule/Employees/employees.service';
import { EmployeeAutocompleteToComponent } from './employee-autocomplete-to';

@Component({
  selector: 'app-employee-autocomplete',
  templateUrl: './employee-autocomplete-to.html',
  styles: [
    `.input-full-width{ width: 100%;}`
  ],
  providers: [EmployeesService]
})
export class EmployeeAutocompleteComponent extends EmployeeAutocompleteToComponent implements OnInit {

  constructor(public service: EmployeesService) {
    super(service)
  }


  ngOnInit() {
    this.itemControl.valueChanges
    //.debounceTime(400)
    .subscribe( data => {
      if (data) {
        this.service.Through(data).subscribe(response => {
            this.searchResult = response;
        }, ()=>{
          this.ResetControl()
        })
      }
        
    })
  }



}
