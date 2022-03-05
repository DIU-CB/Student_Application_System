import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { DashboardModule } from './module/dashboard/dashboard.module';

const routes: Routes = [
  {path: '', component: LoginComponent}
  , {path: 'login', component: LoginComponent}
  // , {path: 'dashboard', loadChildren: ()=> DashboardModule}
  , {path: 'dashboard', loadChildren: './module/dashboard/dashboard.module#DashboardModule'}
  , {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  , {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
