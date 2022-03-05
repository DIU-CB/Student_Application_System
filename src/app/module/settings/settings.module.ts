import { NgModule } from "@angular/core";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { UIKitModule } from "src/app/core/UI-kit/ui.kit.module";
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCheckboxModule, MatDividerModule, MatSlideToggleModule, MatListModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouteGuard } from "src/app/core/authentication/Services/route.guard";
import { SettingsRouteModule } from "./settings.route.module";
import { SettingsComponent } from "./settings.component";
import { AppTypeCreateComponent } from "./pages/application-type/create";
import { AppTypeEditComponent } from "./pages/application-type/edit";
import { AppTypeListComponent } from "./pages/application-type/list";
import { EmployeeMappingsCreateComponent } from "./pages/employee-academic-mapping/create";
import { EmployeeMappingsEditComponent } from "./pages/employee-academic-mapping/edit";
import { ApplicationTypesFormComponent } from "./components/application-types-form/application-types-form";
import { ApplicationTypeListComponent } from "./components/application-types-list/application-type-list";
import { EmployeeAcademicMappingFormComponent } from "./components/employee-academic-mapping-form/employee-academic-mapping-form";
import { EmployeeAcademicMappingListComponent } from "./components/employee-academic-mapping-list/employee-academic-mapping-list";
import { EmployeeMappingsListComponent } from "./pages/employee-academic-mapping/list";
import { PowerOfAttorneyPageComponent } from "./pages/power-of-attorney-page/power-of-attorney-page.component";
import { SemesterListPageComponent } from "./pages/semester/semester-list";
import { SemesterListComponent } from "./components/semester-list.component/semester-list.component";

const _sharedComponent = [
    SettingsComponent
    , AppTypeCreateComponent
    , AppTypeEditComponent
    , AppTypeListComponent
    , EmployeeMappingsCreateComponent
    , EmployeeMappingsEditComponent
    , EmployeeMappingsListComponent

    , ApplicationTypesFormComponent
    , ApplicationTypeListComponent
    , EmployeeAcademicMappingFormComponent
    , EmployeeAcademicMappingListComponent
    , PowerOfAttorneyPageComponent
    , SemesterListPageComponent
    , SemesterListComponent
  ]
  
  const _sharedMaterialModule = [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSlideToggleModule
    , MatListModule
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
    ],
    providers: [PopNotificationService, RouteGuard],
    imports: [
      CommonModule,
      RouterModule,
      _MaterialModule,
      SettingsRouteModule,
      SharedModule,
      UIKitModule
    ]
  })
  export class SettingsModule { }