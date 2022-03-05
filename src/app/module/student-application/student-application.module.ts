import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentApplicationComponent } from './student-application.component';
import { StudentApplicationRouteModule } from './student-application-route.module';
import { StudentApplicationCreateComponent } from './pages/create';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCardModule, MatSnackBarModule, MatIconModule, MatDatepickerModule, DateAdapter, MatNativeDateModule } from '@angular/material';
import { StudentApplicationFormComponent } from './components/student-application-form/student-application-form.component';
import { StudentApplicationListComponent } from './components/student-application-list/student-application-list.compont';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIKitModule } from 'src/app/core/UI-kit/ui.kit.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentApplicationEditComponent } from './pages/edit';
import { PopNotificationService } from 'src/app/shared/service/pop.notification';
import { StudentApplicationListPageComponent } from './pages/list';
import { StudentApplicationPrintComponent } from './pages/print';
import { StudentCommitmentListComponent } from './components/student-commitment-list/student-commitment-list.compont';
import { StudentCommitmentListPageComponent } from './pages/commitmentlist';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const _sharedComponent = [
  StudentApplicationCreateComponent
  , StudentApplicationFormComponent
  , StudentApplicationListComponent
  , StudentApplicationListPageComponent
  , StudentApplicationEditComponent
  , StudentApplicationPrintComponent
  , StudentCommitmentListPageComponent
  , StudentCommitmentListComponent
]

const _sharedMaterialModule = [
  MatToolbarModule,
  MatCardModule
]

const _sharedMaterialFomsModule = [
  MatFormFieldModule
  , MatInputModule
  , MatSelectModule
  , MatOptionModule
  , MatButtonModule
  , MatIconModule
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
    StudentApplicationComponent
    , _sharedComponent
  ],
  providers: [PopNotificationService, MatDatepickerModule],
  imports: [
    CommonModule,
    RouterModule,
    _MaterialModule,
    StudentApplicationRouteModule,
    SharedModule,
    UIKitModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CKEditorModule
  ]
})
export class StudentApplicationModule { }
