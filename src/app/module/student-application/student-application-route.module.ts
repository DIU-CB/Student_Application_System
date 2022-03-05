import { NgModule } from '@angular/core';
import { StudentApplicationComponent } from './student-application.component';
import { Routes, RouterModule } from '@angular/router';
import { StudentApplicationCreateComponent } from './pages/create';
import { StudentApplicationEditComponent } from './pages/edit';
import { StudentApplicationListPageComponent } from './pages/list';
import { StudentApplicationPrintComponent } from './pages/print';
import { StudentCommitmentListPageComponent } from './pages/commitmentlist';

const routes: Routes = [
  {path: '', component: StudentApplicationComponent, children: [
    {path: 'create', component: StudentApplicationCreateComponent},
    {path: 'edit/:id', component: StudentApplicationEditComponent},
    {path: 'print/:id', component: StudentApplicationPrintComponent},
    {path: 'list', component: StudentApplicationListPageComponent},
    {path: 'commitment-list', component: StudentCommitmentListPageComponent}
  ]}
  //, {path: 'studentapplication', loadChildren: '../student-application/student-application.module#StudentApplicationModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
  , exports: [RouterModule]
})

export class StudentApplicationRouteModule { }
