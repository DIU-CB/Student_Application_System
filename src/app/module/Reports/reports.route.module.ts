
import { ReportComponent } from "./reports.component";
import { DueCollectionPageComponent } from "./pages/due-collection/due-collection.page.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { StudentCommitmentComponent } from "./pages/student-commitment/student-commitment.component";
import { AccountsInfoComponent } from "./pages/accounts-info/accounts-info.component";

const routes: Routes = [
    {path: '', component: ReportComponent, children: [
      {path: 'due-collection', component: DueCollectionPageComponent},
      {path: 'student-commitment', component: StudentCommitmentComponent},
      {path: 'accounts-info', component: AccountsInfoComponent}
    ]}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)]
    , exports: [RouterModule]
  })
  
  export class ReportRouteModule { }