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
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { HomeSearchCardComponent } from './left-panel/home-search-card/home-search-card.component';
import {CardModule} from "primeng/card";
import { LibraryCardComponent } from './left-panel/library-card/library-card.component';
import {RippleModule} from "primeng/ripple";
import { LinkComponent } from './header/link/link.component';
import { BottomComponentComponent } from './bottom-component/bottom-component.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import {ImageModule} from "primeng/image";
import {SliderModule} from "primeng/slider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ChipsModule} from "primeng/chips";

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLoggedInComponent,
    HeaderNotLoggedInComponent,
    HeaderLinkComponent,
    MainContainerComponent,
    LeftPanelComponent,
    HomeSearchCardComponent,
    LibraryCardComponent,
    LinkComponent,
    BottomComponentComponent,
    MainHeaderComponent,
  ],
    exports: [
        HeaderComponent,
        MainContainerComponent,
        LeftPanelComponent,
        BottomComponentComponent,
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
    CardModule,
    RippleModule,
    ImageModule,
    SliderModule,
    FormsModule,
    SharedModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    ChipsModule,
  ]
})
export class LayoutModule { }
