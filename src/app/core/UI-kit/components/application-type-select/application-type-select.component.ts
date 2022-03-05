import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, SelectControlValueAccessor, Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';
import { ApplicationTypeQueryService } from 'src/app/core/serviceModule/ApplicationType/application-type-queries.query';

@Component({
  selector: 'app-application-type-select',
  templateUrl: './application-type-select.component.html',
  styleUrls: ['./application-type-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApplicationTypeSelectComponent),
      multi: true
    }
    // ,{
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => ApplicationTypeSelectComponent),
    //   multi: true,
    // }
  ]
})
export class ApplicationTypeSelectComponent implements ControlValueAccessor{
  public _value:string;
  constructor(public applicationTypesService: ApplicationTypeQueryService) { }

  onChanged: any = () => {}
  onTouched: any = () => {}

  writeValue(val) {
    this._value = val;
  }

  registerOnChange(fn: any){
    this.onChanged = fn
  }
  registerOnTouched(fn: any){
    this.onTouched = fn
  }
  setValue(item: any) {
      this.onChanged(item.value)
      this.onTouched();
  }

}
