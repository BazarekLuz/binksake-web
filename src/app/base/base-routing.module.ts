import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BaseComponent} from "./base.component";
import {MainViewComponent} from "../features/main-view/main-view.component";
import {AlbumComponent} from "../features/album/album.component";

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: MainViewComponent,
      },
      {
        path: 'albums/:id',
        component: AlbumComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule { }
