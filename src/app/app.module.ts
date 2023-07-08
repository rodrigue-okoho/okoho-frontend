import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {NgxWebstorageModule} from "ngx-webstorage";
import {httpInterceptorProviders} from "./core/interceptor";
import {MainComponent} from "./components/main/main.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ErrorComponent} from "./components/error/error.component";
import {ActiveMenuDirective} from "./components/navbar/active-menu.directive";
import {FooterComponent} from "./components/footer/footer.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HomeModule} from "./views/home/home.module";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {missingTranslationHandler, translatePartialLoader} from "./core/config/translation.config";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'okoho', separator: '-', caseSensitive: true }),
    NgbModule,
    HomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
      },
    }),
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'fr' },
    httpInterceptorProviders,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class AppModule { }
