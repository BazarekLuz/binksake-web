import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BaseComponent} from "./base.component";
import {MainViewComponent} from "../features/main-view/main-view.component";
import {AlbumComponent} from "../features/album/album.component";
import {ArtistComponent} from "../features/artist/artist.component";
import {SearchComponent} from "../features/search/search.component";

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
      },
      {
        path: 'artists/:id',
        component: ArtistComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule { }
