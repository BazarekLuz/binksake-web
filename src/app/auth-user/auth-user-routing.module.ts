import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthUserComponent} from "./auth-user.component";
import {LoginComponent} from "../features/auth/login/login.component";
import {RegisterFormComponent} from "../features/auth/register-form/register-form.component";


const routes: Routes = [
  {
    path: '',
    component: AuthUserComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthUserRoutingModule { }
