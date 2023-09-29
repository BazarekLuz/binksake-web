import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthUserRoutingModule} from "./auth-user-routing.module";
import { AuthUserComponent } from './auth-user.component';
import {RouterOutlet} from "@angular/router";
import {LayoutModule} from "../core/layout/layout.module";



@NgModule({
  declarations: [
    AuthUserComponent
  ],
  imports: [
    CommonModule,
    AuthUserRoutingModule,
    RouterOutlet,
    LayoutModule
  ]
})
export class AuthUserModule { }
