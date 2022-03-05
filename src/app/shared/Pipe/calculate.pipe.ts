import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'sumOf'})
export class CalculationPipe implements PipeTransform {
    transform(items: any[], propName: string): any {
        if (!items || !propName) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        let obj = this.CalculateTotal(items, propName)
        return obj;
    }

    CalculateTotal(items:any[], columnName:string){
        let total = 0;
        if (items) {
          if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
              const element = items[index];
              if (element[columnName]) {
                total += parseFloat(element[columnName]); 
              }
            }
          }
        }
        return total;
      }
}