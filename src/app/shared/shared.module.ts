import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialog } from './components/UI-Kit/Dialog/delete-dialog/delete-dialog';
import { MatDialogModule, MatProgressSpinnerModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { CircleLoader } from './components/UI-Kit/Loader/circle-loader/circle-loader';
import { PopNotificationService } from './service/pop.notification';
import { DateFormatService } from './service/date-format.service';
import { MyFormFilterPipe } from './Pipe/filter.pipe';
import { MyFormValueFilterPipe } from './Pipe/filterValue.pipe';
import { FilterApplicationConcernsPipe } from './Pipe/filter.concerns.pipe';
import { XPaginationComponent } from './components/UI-Kit/x-pagination/x-pagination.component';
import { PrintService } from './Print/print.service';
import { PagenumberDropdownComponent } from './components/UI-Kit/Dropdown/pagenumber/pagenumber.component';
import { FormsModule } from '@angular/forms';
import { GlogbalNotification } from './components/UI-Kit/Notification/global.notification';
import { CalculationPipe } from './Pipe/calculate.pipe';

const _exportableComponent = [
  DeleteDialog
  , CircleLoader
  , MyFormFilterPipe
  , MyFormValueFilterPipe
  , CalculationPipe
  , FilterApplicationConcernsPipe
  , XPaginationComponent
  , PagenumberDropdownComponent
  , GlogbalNotification
]

@NgModule({
  declarations: [_exportableComponent],
  imports: [
    CommonModule
    , MatDialogModule
    , FormsModule
    , MatSelectModule
    , MatProgressSpinnerModule
    , MatButtonModule
  ]
  , providers: [
    PopNotificationService
    , DateFormatService
    , PrintService
  ],
  entryComponents: [DeleteDialog],
  exports: [_exportableComponent]
})
export class SharedModule { }
