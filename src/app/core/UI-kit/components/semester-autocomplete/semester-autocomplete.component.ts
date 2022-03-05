import { AutocompleteService } from "../../ui-kitService/autocomplete.service";
import { SemesterQueryService } from "src/app/core/serviceModule/SemesterService/semester-query.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-semester-autocomplete',
    templateUrl: './semester-autocomplete.component.html',
    styles: [
      `.input-full-width{ width: 100%;}`
    ],
    providers: [SemesterQueryService]
  })
  export class SemesterAutocompleteToComponent extends AutocompleteService implements OnInit {
  
    constructor(public service: SemesterQueryService) {
      super()
    }
  
    ngOnInit() {
      this.itemControl.valueChanges
      //.debounceTime(400)
      .subscribe( data => {
        if (data) {
          this.service.GetAutocomplete(data).subscribe(response => {
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