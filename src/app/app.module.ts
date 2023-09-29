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
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {AuthenticateInterceptor} from "./core/interceptors/authenticate/authenticate.interceptor";
import {LanguageService} from "./core/services/language/language.service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {lastValueFrom} from "rxjs";
import { MainViewComponent } from './features/main-view/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent
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
    })
  ],
  providers: [
    TranslateService,
    MessageService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticateInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [LanguageService],
      multi: true,
    },
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
