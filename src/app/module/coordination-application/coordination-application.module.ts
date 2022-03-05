import { NgModule } from "@angular/core";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { UIKitModule } from "src/app/core/UI-kit/ui.kit.module";
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatMenuModule, MatSidenavModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CoordinationApplicationRouteModule } from "./coordination-application-route.module";
import { CoordiantionApplicationComponent } from "./coordination-application.component";
import { RouteGuard } from "src/app/core/authentication/Services/route.guard";
import { EditComponent } from "./pages/edit";
import { CoordinationApplicationListComponent } from "./components/coordination-application-list/coordination-application-list";
import { ListComponent } from "./pages/list/list";
import { CoordinationApplicationForwardFormComponent } from "./components/coordination-application-forward-form/coordination-application-forward-form";
import { ForwardComponent } from "./pages/forward";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CoordinationApplicationSearchFormComponent } from "./components/coordination-application-search-form/coordination-application-search-form";
import { DetailsComponent } from "./pages/details";

const _sharedComponent = [
    CoordiantionApplicationComponent
    , EditComponent
    , ListComponent
    , DetailsComponent
    , CoordinationApplicationListComponent
    , ForwardComponent
    , CoordinationApplicationForwardFormComponent
    , CoordinationApplicationSearchFormComponent
  ]
  
  const _sharedMaterialModule = [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSidenavModule
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
    providers: [PopNotificationService, RouteGuard],
    imports: [
      CommonModule,
      RouterModule,
      _MaterialModule,
      CoordinationApplicationRouteModule,
      SharedModule,
      UIKitModule
    ]
  })
  export class CoordinationApplicationModule { }