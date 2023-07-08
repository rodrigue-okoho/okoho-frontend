import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {httpInterceptorProviders} from "./core/interceptor";
import {MainComponent} from "./components/main/main.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ErrorComponent} from "./components/error/error.component";
import {ActiveMenuDirective} from "./components/navbar/active-menu.directive";
import {FooterComponent} from "./components/footer/footer.component";

@NgModule({

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
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
