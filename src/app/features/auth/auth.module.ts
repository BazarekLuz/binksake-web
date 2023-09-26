import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginComponent } from './login/login.component';
import {PasswordModule} from "primeng/password";
import {CardModule} from "primeng/card";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    RegisterFormComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PasswordModule,
    CardModule,
    TranslateModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    SharedModule,
    BrowserAnimationsModule,
  ]
})
export class AuthModule { }
