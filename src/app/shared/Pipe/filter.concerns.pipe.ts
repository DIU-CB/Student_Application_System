import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
    name: 'filterConcernEmployee',
    pure: false
})
export class FilterApplicationConcernsPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // debugger
        return items.filter(item => item.concernedEmployeeId === filter['id']);
    }
}
