import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  template: `
    <span>{{item?.name}}</span>
  `
})
export class StatusComponent {
    @Input()item: any;
}
