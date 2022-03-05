import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SemesterQueryService } from 'src/app/core/serviceModule/SemesterService/semester-query.service';

@Component({
  selector: 'app-semester-select',
  templateUrl: './semester-select.component.html',
  styleUrls: ['./semester-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SemesterSelectComponent),
      multi: true
    }
  ]
})
export class SemesterSelectComponent implements ControlValueAccessor{
  public _value:string;
  constructor(public semesterService: SemesterQueryService) { }

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
