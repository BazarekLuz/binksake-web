import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {RouterLink} from "@angular/router";

@NgModule({
    declarations: [
    AlbumCardComponent
  ],
  exports: [
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ImageModule,
    NgOptimizedImage,
    RouterLink
  ]
})
export class SharedModule { }
