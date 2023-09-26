import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from "@angular/router";
import {RegisterFormComponent} from "./features/auth/register-form/register-form.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {HeroComponent} from "./features/landing/hero/hero.component";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HeroComponent,
  },
]



@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
