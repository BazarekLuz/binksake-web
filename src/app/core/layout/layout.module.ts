import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { HeaderLoggedInComponent } from './header/header-logged-in/header-logged-in.component';
import { HeaderNotLoggedInComponent } from './header/header-not-logged-in/header-not-logged-in.component';
import { HeaderLinkComponent } from './header/header-link/header-link.component';
import {TranslateModule} from "@ngx-translate/core";
import {AvatarModule} from "primeng/avatar";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import { MainContainerComponent } from './main-container/main-container.component';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLoggedInComponent,
    HeaderNotLoggedInComponent,
    HeaderLinkComponent,
    MainContainerComponent,
    NavSideBarComponent,
  ],
  exports: [
    HeaderComponent,
    MainContainerComponent,
    NavSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    TranslateModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
  ]
})
export class LayoutModule { }
