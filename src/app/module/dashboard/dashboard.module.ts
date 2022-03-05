import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule, MatToolbarModule, MatRadioModule, MatListModule, MatMenuModule, MatExpansionModule, MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UIKitModule } from 'src/app/core/UI-kit/ui.kit.module';
import { HomeComponent } from './Home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';

const materialModule = [
  MatSidenavModule
  , MatToolbarModule
  , MatRadioModule
  , MatListModule
  , MatMenuModule
  , MatRadioModule
  , MatExpansionModule
  , MatIconModule
  , MatButtonModule
  , MatTooltipModule
  , MatCardModule
  , FlexLayoutModule
]

const angularModule = [
  RouterModule
  , FormsModule
  , ReactiveFormsModule
]

const _modules = [materialModule, ...angularModule]


@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule
    , _modules
    , DashboardRoutingModule
    , UIKitModule
    , SharedModule
  ]
  , exports: [DashboardComponent]
})
export class DashboardModule { }
