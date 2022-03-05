import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonDataQueriesService } from 'src/app/core/serviceModule/CommonDataQueries/common-data-queries.service';

@Component({
  selector: 'app-campus-select',
  templateUrl: './campus-select.component.html',
  styleUrls: ['./campus-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CampusSelectComponent),
      multi: true
    }
  ]
})
export class CampusSelectComponent implements ControlValueAccessor{
  public value:string;
  constructor(public commonQuery: CommonDataQueriesService) { }

  onChanged: any = () => {}
  onTouched: any = () => {}

  writeValue(val) {
    if (val) {
      this.value = val;
    }
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
