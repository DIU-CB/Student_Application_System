import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonDataQueriesService } from 'src/app/core/serviceModule/CommonDataQueries/common-data-queries.service';

@Component({
  selector: 'app-program-select',
  templateUrl: './program-select.component.html',
  styleUrls: ['./program-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProgramSelectComponent),
      multi: true
    }
  ]
})
export class ProgramSelectComponent implements ControlValueAccessor{
  public _value:string;
  constructor(public commonQuery: CommonDataQueriesService) { }

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
