import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
    name: 'filterConcern',
    pure: false
})
export class MyFormFilterPipe implements PipeTransform {
    transform(items: FormArray[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // debugger
        return items.filter(item => item.value.applicationConcernTypeId === filter['applicationConcernTypeId']);
    }
}
