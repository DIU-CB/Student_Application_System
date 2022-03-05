import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterValueConcern',
    pure: false
})

export class MyFormValueFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        debugger
        return items.filter(item => item.applicationConcernTypeId === filter['applicationConcernTypeId']);
    }
}