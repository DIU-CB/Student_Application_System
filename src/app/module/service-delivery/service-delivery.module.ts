import { NgModule } from "@angular/core";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { UIKitModule } from "src/app/core/UI-kit/ui.kit.module";
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatDividerModule, MatSlideToggleModule , MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouteGuard } from "src/app/core/authentication/Services/route.guard";
import { ServiceDeliveryRouteModule } from "./service-delivery.route.module";
import { ServiceDeliveryComponent } from "./service-delivery.component";
import { ApprovedListPageComponent } from "./pages/approved-list-page";
import { ApprovedApplicationListComponent } from "./components/approved-application-list/approved-application-list";
import { ApprovedApplicationDetailsPageComponent } from "./pages/approved-application-details";
import { ApprovedApplicationDetailsComponent } from "./components/approved-application-details/approved-application-details.component";
import { ServiceDeliveryConfigService } from "./Service/service-delivery-config.service";
import { ServiceDeliverySearchFormComponent } from "./components/service-delivery-search-form/service-delivery-search-form";

const _sharedComponent = [
    ServiceDeliveryComponent

    , ApprovedListPageComponent
    , ApprovedApplicationListComponent

    , ApprovedApplicationDetailsPageComponent
    , ApprovedApplicationDetailsComponent
    , ServiceDeliverySearchFormComponent
    
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
    , MatDatepickerModule
    , MatNativeDateModule
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
      _sharedComponent
    ],
    providers: [
        PopNotificationService
        , ServiceDeliveryConfigService
        , RouteGuard
    ],
    imports: [
      CommonModule,
      RouterModule,
      _MaterialModule,
      ServiceDeliveryRouteModule,
      SharedModule,
      UIKitModule
    ]
  })
  export class ServiceDeliveryModule { }