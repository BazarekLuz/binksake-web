import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {LandingModule} from "./features/landing/landing.module";
import {AuthModule} from "./features/auth/auth.module";
import {RouterOutlet} from "@angular/router";
import {LayoutModule} from "./core/layout/layout.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {CookieModule} from "ngx-cookie";
import {AppRoutingModule} from "./app-routing.module";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {LanguageService} from "./core/services/language/language.service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {lastValueFrom} from "rxjs";
import { MainViewComponent } from './features/main-view/main-view.component';
import { AlbumComponent } from './features/album/album.component';
import {ImageModule} from "primeng/image";
import {TableModule} from "primeng/table";
import { ArtistComponent } from './features/artist/artist.component';
import {SharedModule} from "./shared/shared.module";
import { SearchComponent } from './features/search/search.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import { PlaylistComponent } from './features/playlist/playlist.component';
import {ButtonModule} from "primeng/button";

@NgModule({
    declarations: [
        AppComponent,
        MainViewComponent,
        AlbumComponent,
        ArtistComponent,
        SearchComponent,
        PlaylistComponent,
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    LandingModule,
    AuthModule,
    RouterOutlet,
    LayoutModule,
    HttpClientModule,
    CookieModule.withOptions(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    ImageModule,
    TableModule,
    SharedModule,
    InputTextModule,
    FormsModule,
    ButtonModule
  ],
    providers: [
        TranslateService,
        MessageService,
        DatePipe,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthenticateInterceptor,
        //     multi: true,
        // },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [LanguageService],
            multi: true,
        },
    ],
    exports: [
        AlbumComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(translate: LanguageService) {
  return () => {
    translate.setLocalStorage();
    return lastValueFrom(translate.use(translate.currentLanguage()));
  };
}
