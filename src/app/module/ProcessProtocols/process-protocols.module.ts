import { UIKitModule } from "src/app/core/UI-kit/ui.kit.module";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { RouteGuard } from "src/app/core/authentication/Services/route.guard";
import { MatSnackBarModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatOptionModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatSidenavModule, MatMenuModule, MatProgressSpinnerModule, MatDividerModule, MatCardModule, MatToolbarModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ProcessProtocolsComponent } from "./ProcessProtocols.component";
import { ProcessProtocolsRouteModule } from "./ProcessProtocols.route.module";
import { ListComponent } from "./pages/list/list";
import { CreateComponent } from "./pages/create";
import { NgModule } from "@angular/core";
import { ProcessProtocolFormComponent } from "./Components/process-protocol-form/process-protocol-form.component";
import { ProcessProtocolTableComponent } from "./Components/process-protocol-table/process-protocol-table.component";
import { ProcessProtocolSearchComponent } from "./Components/process-protocol-search/process-protocol-search.component";
import { EditComponent } from "./pages/edit";
import { DetailsComponent } from "./pages/details";
import { ProcessProtocolDetailsComponent } from "./Components/process-protocol-details/process-protocol-details.component";

const _sharedComponent = [
    ProcessProtocolsComponent
    , EditComponent
    , ListComponent
    , CreateComponent
    , DetailsComponent
    // , CoordinationApplicationListComponent
    // , ForwardComponent
    , ProcessProtocolFormComponent
    , ProcessProtocolTableComponent
    , ProcessProtocolSearchComponent
    , ProcessProtocolDetailsComponent
    // , CoordinationApplicationSearchFormComponent
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
      ProcessProtocolsRouteModule,
      _MaterialModule,
      SharedModule,
      UIKitModule
    ]
  })
  export class ProcessProtocolsModule { }