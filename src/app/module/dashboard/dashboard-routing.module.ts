import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { RouteGuard } from "src/app/core/authentication/Services/route.guard";
import { HomeComponent } from "./Home/home.component";
import { ProcessProtocolsModule } from "../ProcessProtocols/process-protocols.module";




const routes: Routes = [
    {path: '', component: DashboardComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'student-application'
        , canActivate: [RouteGuard], data: {roles: ['Student']}
        , loadChildren: '../student-application/student-application.module#StudentApplicationModule'
        },
      {path: 'coordination-application'
      , canActivate: [RouteGuard], data: {roles: ['Coordinator']}
      , loadChildren: '../coordination-application/coordination-application.module#CoordinationApplicationModule'}
      ,
      {path: 'authority-application'
      , canActivate: [RouteGuard], data: {roles: ['User']}
      , loadChildren: '../authority-application/authority-application.module#AuthorityApplicationModule'}
      
      ,
      {path: 'service-delivery'
      , canActivate: [RouteGuard], data: {roles: ['Coordinator', 'Accounts', 'Exam', 'Registrar', 'Admin']}
      , loadChildren: '../service-delivery/service-delivery.module#ServiceDeliveryModule'}
      ,
      {path: 'process-protocol'
      , canActivate: [RouteGuard], data: {roles: ['Coordinator', 'Admin']}
      , loadChildren: '../ProcessProtocols/process-protocols.module#ProcessProtocolsModule'}
      ,
      {path: 'settings'
      , canActivate: [RouteGuard], data: {roles: ['Coordinator', 'Admin', 'User']}
      , loadChildren: '../settings/settings.module#SettingsModule'}
      ,
      {path: 'reports'
      , canActivate: [RouteGuard], data: {roles: ['Coordinator', 'Admin', 'User']}
      , loadChildren: '../Reports/reports.module#ReportModule'}
    ]}
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)]
    //, exports: [RouterModule]
  })
  export class 
  DashboardRoutingModule { }