import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthorityApplicationComponent } from "./authority-application.component";
import { ProceedComponent } from "./pages/proceed.component";
import { ListComponent } from "./pages/list/list.component";
import { EditComponent } from "./pages/edit";
import { DetailsComponent } from "./pages/details";


const routes: Routes = [
    {path: '', component: AuthorityApplicationComponent, children: [
      {path: 'proceed/:id', component: ProceedComponent},
      {path: 'edit/:id', component: EditComponent},
      {path: 'details/:id', component: DetailsComponent},
      {path: 'list', component: ListComponent},
      //{path: 'listpending', component: PendingListComponent}
    ]}
    //, {path: 'studentapplication', loadChildren: '../student-application/student-application.module#StudentApplicationModule'}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)]
    , exports: [RouterModule]
  })
  
  export class AuthorityApplicationRouteModule { }