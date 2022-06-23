import { NgModule } from "@angular/core";
import { MatNativeDateModule,MatDatepickerModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatSnackBarModule, MatDividerModule, MatProgressSpinnerModule, MatMenuModule, MatSidenavModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PopNotificationService } from "src/app/shared/service/pop.notification";
import { RouteGuard } from "src/app/core/authentication/Services/route.guard";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { UIKitModule } from "src/app/core/UI-kit/ui.kit.module";
import { AuthorityApplicationRouteModule } from "./authority-application.route";
import { AuthorityApplicationComponent } from "./authority-application.component";
import { ListComponent } from "./pages/list/list.component";
import { ProceedComponent } from "./pages/proceed.component";
import { AuthorityApplicationListComponent } from "./components/authority-application-list/authority-application-list.component";
import { AuthorityApplicationProceedFormComponent } from "./components/authority-application-create/authority-application-create.component";
import { EditComponent } from "./pages/edit";
import { AuthorityApplicationSearchFormComponent } from "./components/authority-application-search-form/authority-application-search-form";
import { DetailsComponent } from "./pages/details";
import { PendingListComponent } from './pages/pending-list/pending-list.component';


const _sharedComponent = [
    AuthorityApplicationComponent
    , ProceedComponent
    , EditComponent
    , ListComponent
    , DetailsComponent
     , AuthorityApplicationListComponent
     , AuthorityApplicationProceedFormComponent
     , AuthorityApplicationSearchFormComponent
  ]
  
  const _sharedMaterialModule = [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSidenavModule
  ]
  
  const _sharedMaterialFomsModule = [
    MatFormFieldModule
    , MatInputModule
    , MatSelectModule
    , MatOptionModule
    , MatButtonModule
    , MatIconModule
    , MatCheckboxModule
    ,MatDatepickerModule
    ,MatNativeDateModule
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
      PendingListComponent
    ],
    providers: [PopNotificationService, RouteGuard],
    imports: [
      CommonModule,
      RouterModule,
      _MaterialModule,
      AuthorityApplicationRouteModule,
      SharedModule,
      UIKitModule,
  
    ]
  })
  export class AuthorityApplicationModule { }