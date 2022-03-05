import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SettingsComponent } from "./settings.component";
import { AppTypeCreateComponent } from "./pages/application-type/create";
import { AppTypeEditComponent } from "./pages/application-type/edit";
import { AppTypeListComponent } from "./pages/application-type/list";
import { EmployeeMappingsCreateComponent } from "./pages/employee-academic-mapping/create";
import { EmployeeMappingsEditComponent } from "./pages/employee-academic-mapping/edit";
import { EmployeeMappingsListComponent } from "./pages/employee-academic-mapping/list";
import { PowerOfAttorneyPageComponent } from "./pages/power-of-attorney-page/power-of-attorney-page.component";
import { SemesterListPageComponent } from "./pages/semester/semester-list";


  const routes: Routes = [
    {path: '', component: SettingsComponent, children: [
      {path: 'app-type-create', component: AppTypeCreateComponent},
      {path: 'app-type-edit/:id', component: AppTypeEditComponent },
      {path: 'app-type-list', component: AppTypeListComponent},
      {path: 'employee-map-create', component: EmployeeMappingsCreateComponent},
      {path: 'employee-map-list', component: EmployeeMappingsListComponent},
      {path: 'employee-map-edit/:id', component: EmployeeMappingsEditComponent },
      {path: 'power-of-attorney', component: PowerOfAttorneyPageComponent },
      {path: 'semester-list', component: SemesterListPageComponent },
    ]}
    //, {path: 'studentapplication', loadChildren: '../student-application/student-application.module#StudentApplicationModule'}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)]
    , exports: [RouterModule]
  })
  
  export class SettingsRouteModule { }