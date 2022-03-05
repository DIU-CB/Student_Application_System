import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatOptionModule, MatSelectModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDividerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from './Services/token.service';
import { AuthenticationService } from './Services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';
import { RouteGuard } from './Services/route.guard';
import { SharedModule } from 'src/app/shared/shared.module';

const _sharedComponent = [
  LoginComponent
]

@NgModule({
  declarations: [_sharedComponent],
  imports: [
    CommonModule
    , FlexLayoutModule
    , MatCardModule
    , HttpClientModule
    , MatFormFieldModule
    , FormsModule
    , ReactiveFormsModule
    , MatInputModule
    , MatButtonModule
    , MatCheckboxModule
    , MatOptionModule
    , MatSelectModule
    , MatIconModule
    , MatProgressSpinnerModule
    , MatProgressBarModule
    , MatDividerModule
    , SharedModule
  ]
  , providers: [
    TokenService
    , AuthenticationService
    , RouteGuard
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
  , exports: [
    _sharedComponent
  ]
})
export class AuthenticationModule { }
