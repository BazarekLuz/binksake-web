import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {RouterLink} from "@angular/router";
import { SongslistComponent } from './songslist/songslist.component';
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';

@NgModule({
    declarations: [
    AlbumCardComponent,
    SongslistComponent,
    ArtistCardComponent,
    PlaylistCardComponent
  ],
  exports: [
    AlbumCardComponent,
    SongslistComponent,
    ArtistCardComponent,
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ImageModule,
    NgOptimizedImage,
    RouterLink,
    TableModule,
    TranslateModule
  ]
})
export class SharedModule { }
