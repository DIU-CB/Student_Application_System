import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatusComponent } from "./components/status.component";
import { StudentInfoCardComponent } from "./components/student-card-info.component";
import { StudentPaymentStatusCardComponent } from "./components/student-payment-status-card.component";
import { MatCardModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatSelectModule, MatToolbarModule, MatOptionModule, MatAutocompleteModule, MatDividerModule, MatTooltipModule, MatCheckboxModule, MatDialogModule } from "@angular/material";
import { StudentResultCardComponent } from "./components/student-card-result.component";
import { AutocompleteService } from "./ui-kitService/autocomplete.service";
import { EmployeeAutocompleteToComponent } from "./components/employee-autocomplete/employee-autocomplete-to";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeAutocompleteThroughComponent } from "./components/employee-autocomplete/employee-autocomplete-through";
import { StudentFileComponent } from "./components/file-component/student-file-component";
import { StudentFileAdminComponent } from "./components/file-component/student-file-admin-component";
import { UserImageComponent } from "./components/user-image.component";
import { ApplicationBodyCardComponent } from "./components/application-body-card";
import { ThroughSingleFormComponent } from "./components/through-single-form";
import { SharedModule } from "src/app/shared/shared.module";
import { ApplicationDetailsComponent } from "./components/application-details/application-details.component";
import { ApplicationConcernStatusTableComponent } from "./components/application-concern-status-table";
import { EmployeeAutocompleteComponent } from "./components/employee-autocomplete/employee-autocomplete";
import { CommitmentFormComponent } from "./components/commitmentForm/commitment-form.component";
import { SemesterAutocompleteToComponent } from "./components/semester-autocomplete/semester-autocomplete.component";
import { CommitmentViewComponent } from './components/commitment-view/commitment-view.component';
import { ComitmentDialogViewComponent, DialogOverviewExampleDialog } from './components/comitment-dialog-view/comitment-dialog-view.component';
import { StudentCommitmentReportTableComponent } from "./components/student-commitment-report-table/student-commitment-report-table.component";
import { ApplicationTypeSelectComponent } from './components/application-type-select/application-type-select.component';
import { StatusSelectComponent } from './components/status-select/status-select.component';
import { ProgramSelectComponent } from './components/program-select/program-select.component';
import { SemesterSelectComponent } from './components/semester-select/semester-select.component';
import { CampusSelectComponent } from './components/campus-select/campus-select.component';
import { ShiftSelectComponent } from './components/shift-select/shift-select.component';

const _exportableComponent = [
    StatusComponent
    , StudentInfoCardComponent
    , StudentResultCardComponent
    , StudentPaymentStatusCardComponent
    , EmployeeAutocompleteToComponent
    , EmployeeAutocompleteThroughComponent
    , EmployeeAutocompleteComponent
    , StudentFileComponent
    , StudentFileAdminComponent
    , UserImageComponent
    , ApplicationBodyCardComponent
    , ThroughSingleFormComponent
    , ApplicationDetailsComponent
    , ApplicationConcernStatusTableComponent
    , CommitmentFormComponent
    , SemesterAutocompleteToComponent
    , CommitmentViewComponent
    , ComitmentDialogViewComponent
    , DialogOverviewExampleDialog
    , StudentCommitmentReportTableComponent
    , ApplicationTypeSelectComponent
    , StatusSelectComponent
    , ProgramSelectComponent
    , SemesterSelectComponent
    , CampusSelectComponent
    , ShiftSelectComponent
]

const _sharedMaterialModule = [
  MatToolbarModule,
  MatCardModule
  , MatCheckboxModule
  , MatIconModule
  , MatAutocompleteModule
  , MatDividerModule
  , MatTooltipModule
  , MatDialogModule
]

const _sharedMaterialFomsModule = [
  MatFormFieldModule
  , MatInputModule
  , MatSelectModule
  , MatOptionModule
  , MatButtonModule
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
  FlexLayoutModule
]



@NgModule({
    declarations: [_exportableComponent],
    imports: [
      CommonModule
      , _MaterialModule
      , SharedModule
    ]
    , providers: [AutocompleteService]
    , exports: [_exportableComponent]
    , entryComponents: [ComitmentDialogViewComponent, DialogOverviewExampleDialog]
  })
  export class UIKitModule { }