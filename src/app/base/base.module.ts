import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import {RouterOutlet} from "@angular/router";
import {LayoutModule} from "../core/layout/layout.module";
import {BaseRoutingModule} from "./base-routing.module";
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutModule,
    BaseRoutingModule,
  ]
})
export class BaseModule { }
