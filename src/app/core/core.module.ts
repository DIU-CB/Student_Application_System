import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ServiceModule } from './serviceModule/service.module';
import { HttpClientModule } from '@angular/common/http';
import { UIKitModule } from './UI-kit/ui.kit.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    , AuthenticationModule
    , ServiceModule
    , UIKitModule
  ]
  //, exports: [AuthenticationModule]
})
export class CoreModule { }
