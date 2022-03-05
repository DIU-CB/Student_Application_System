
import { ServiceDeliveryComponent } from "../service-delivery/service-delivery.component";
import { MatToolbarModule, MatCardModule, MatDividerModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatSnackBarModule } from "@angular/material";

import { ServiceDeliveryConfigService } from "../service-delivery/Service/service-delivery-config.service";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { RouteGuard } from "src/app/core/authentication/Services/route.guard";
import { SharedModule } from "src/app/shared/shared.module";
import { UIKitModule } from "src/app/core/UI-kit/ui.kit.module";
import { ReportRouteModule } from "./reports.route.module";
import { ReportComponent } from "./reports.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DueCollectionPageComponent } from "./pages/due-collection/due-collection.page.component";
import { StudentCommitmentComponent } from "./pages/student-commitment/student-commitment.component";
import { AccountsInfoComponent } from './pages/accounts-info/accounts-info.component';
import { StudentCommitmentReportTableComponent } from '../../core/UI-kit/components/student-commitment-report-table/student-commitment-report-table.component';

const _sharedComponent = [
    ReportComponent,
    DueCollectionPageComponent,
    StudentCommitmentComponent,
      AccountsInfoComponent
  ]
  
  const _sharedMaterialModule = [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSlideToggleModule
  ]
  
  const _sharedMaterialFomsModule = [
    MatFormFieldModule
    , MatInputModule
    , MatSelectModule
    , MatOptionModule
    , MatButtonModule
    , MatIconModule
    , MatCheckboxModule
  ]
  
  const _sharedAngularFomsModule = [
    FormsModule
    , ReactiveFormsModule
  ]
  
  const _sharedFomsModule = [
    _sharedMaterialFomsModule
    , _sharedAngularFomsModule
  ]
  
  const _MaterialModule = [
    _sharedMaterialModule,
    _sharedFomsModule,
    FlexLayoutModule,
    MatSnackBarModule
  ]

@NgModule({
    declarations: [
      _sharedComponent,
      //StudentCommitmentReportTableComponent
    ],
    providers: [
        PopNotificationService
        , RouteGuard
    ],
    imports: [
      CommonModule,
      RouterModule,
      _MaterialModule,
      ReportRouteModule,
      SharedModule,
      UIKitModule
    ]
  })
  export class ReportModule { }