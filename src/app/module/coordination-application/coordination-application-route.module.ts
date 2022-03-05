import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordiantionApplicationComponent } from './coordination-application.component';
import { ListComponent } from './pages/list/list';
import { EditComponent } from './pages/edit';
import { ForwardComponent } from './pages/forward';
import { DetailsComponent } from './pages/details';

const routes: Routes = [
  {path: '', component: CoordiantionApplicationComponent, children: [
    //{path: 'create', component: CreateComponent},
    {path: 'edit/:id', component: EditComponent, data: { pageTitle: 'Application Create'} },
    {path: 'forward/:id', component: ForwardComponent},
    {path: 'details/:id', component: DetailsComponent},
    {path: 'list', component: ListComponent}
  ]}
  //, {path: 'studentapplication', loadChildren: '../student-application/student-application.module#StudentApplicationModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
  , exports: [RouterModule]
})

export class CoordinationApplicationRouteModule { }
