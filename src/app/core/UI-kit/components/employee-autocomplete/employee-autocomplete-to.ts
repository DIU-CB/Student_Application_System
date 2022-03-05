import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from 'src/app/core/serviceModule/Employees/employees.service';
import { AutocompleteService } from '../../ui-kitService/autocomplete.service';

@Component({
  selector: 'app-employee-autocomplete-to',
  templateUrl: './employee-autocomplete-to.html',
  styles: [
    `.input-full-width{ width: 100%;}`
  ],
  providers: [EmployeesService]
})
export class EmployeeAutocompleteToComponent extends AutocompleteService implements OnInit {

  
  constructor(public service: EmployeesService) {
    super()
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

   displayFn(item?: any): string | undefined {
    return item ? item.name : undefined;
  }



}
