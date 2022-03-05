import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ServiceDeliveryComponent } from "./service-delivery.component";
import { ApprovedListPageComponent } from "./pages/approved-list-page";
import { ApprovedApplicationDetailsPageComponent } from "./pages/approved-application-details";


  const routes: Routes = [
    {path: '', component: ServiceDeliveryComponent, children: [
      {path: 'approved-application-list', component: ApprovedListPageComponent},
      {path: 'application-details/:id', component: ApprovedApplicationDetailsPageComponent },
    //   {path: 'app-type-list', component: AppTypeListComponent},
    //   {path: 'employee-map-create', component: EmployeeMappingsCreateComponent},
    //   {path: 'employee-map-list', component: EmployeeMappingsListComponent},
    //   {path: 'employee-map-edit/:id', component: EmployeeMappingsEditComponent },
    ]}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)]
    , exports: [RouterModule]
  })
  
  export class ServiceDeliveryRouteModule { }