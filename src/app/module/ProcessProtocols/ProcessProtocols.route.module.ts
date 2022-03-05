import { Routes, RouterModule } from "@angular/router";
import { ProcessProtocolsComponent } from "./ProcessProtocols.component";
import { NgModule } from "@angular/core";
import { ListComponent } from "./pages/list/list";
import { CreateComponent } from "./pages/create";
import { EditComponent } from "./pages/edit";
import { DetailsComponent } from "./pages/details";

const routes: Routes = [
    {path: '', component: ProcessProtocolsComponent, children: [
      {path: 'create', component: CreateComponent},
      {path: 'edit/:id', component: EditComponent },
    //   {path: 'forward/:id', component: ForwardComponent},
      {path: 'details/:id', component: DetailsComponent},
      {path: 'list', component: ListComponent}
    ]}
    //, {path: 'studentapplication', loadChildren: '../student-application/student-application.module#StudentApplicationModule'}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)]
    , exports: [RouterModule]
  })
  
  export class ProcessProtocolsRouteModule { }