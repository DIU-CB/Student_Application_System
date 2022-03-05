import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatService {

  constructor() { }
  ToYearMonthDate(date: Date): string {
    if (date) {
      if(typeof date !== 'string'){
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return year + '-' + this._to2digit(month) + '-' + this._to2digit(day);
      }
    } else {
      return "";
    }
  }

  private _to2digit(n: number) {
  return ('00' + n).slice(-2);
  } 
}
