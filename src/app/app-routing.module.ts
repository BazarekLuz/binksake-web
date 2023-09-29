import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth-user/auth-user.module').then((module) => module.AuthUserModule),
  },
  {
    path: '',
    loadChildren: () => import('./base/base.module').then((module) => module.BaseModule),
  }
]



@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
