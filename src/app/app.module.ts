import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import {NgxWebstorageModule, SessionStorageService} from "ngx-webstorage";
import {httpInterceptorProviders} from "./core/interceptor";
import {MainComponent} from "./components/main/main.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {ErrorComponent} from "./components/error/error.component";
import {ActiveMenuDirective} from "./components/navbar/active-menu.directive";
import {FooterComponent} from "./components/footer/footer.component";
import {NgbDatepickerConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeModule} from "./views/home/home.module";
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {missingTranslationHandler, translatePartialLoader} from "./core/config/translation.config";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {AccountModule} from "./views/account/account.module";
import {SharedModule} from "./shared/shared.module";
import {ApplicationConfigService} from "./core/config/application-config.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {registerLocaleData} from "@angular/common";
import {fontAwesomeIcons} from "./core/config/font-awesome-icons";
import {SERVER_API_URL} from "./core/app.constants";
import * as dayjs from 'dayjs';
import locale from '@angular/common/locales/fr';
import './core/config/dayjs';
import {ViewsModule} from "./views/views.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {RouterModule, TitleStrategy} from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppPageTitleStrategy} from "./app-page-title-strategy";
import { PasswordStrengthComponent } from './components/password-strength/password-strength.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {ComponentsModule} from "./components/components.module";
import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker';
import { MatomoModule } from 'ngx-matomo';
@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgxWebstorageModule.forRoot({prefix: 'okoho', separator: '-', caseSensitive: true}),
    ToastrModule.forRoot(),
    HomeModule,
    ViewsModule,
    DashboardModule,
    ComponentsModule,
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
    MatomoModule.forRoot({
      scriptUrl: '//analitics.okoho-consulting.de/matomo.js',
      trackers: [
        {
          trackerUrl: 'https://analitics.okoho-consulting.de/matomo.php',
          siteId: 1
        }
      ],
      routeTracking: {
        enable: true
      }
    }),
    // NgxMatomoTrackerModule.forRoot({
    //   siteId: '1', // your Matomo's site ID (find it in your Matomo's settings)
    //   trackerUrl: 'https://analitics.okoho-consulting.de/', // your matomo server root url
    // }),
    // NgxMatomoTrackerModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    Title,
    {provide: LOCALE_ID, useValue: 'en'},
    { provide: TitleStrategy, useClass: AppPageTitleStrategy },
    httpInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '802020147261-bsqh0iaaqcdjl3ip6a41hfh3ad07vgeb.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('566616961159285')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],

  bootstrap: [MainComponent]
})
export class AppModule {
  constructor(
    applicationConfigService: ApplicationConfigService,
    iconLibrary: FaIconLibrary,
    dpConfig: NgbDatepickerConfig,
    translateService: TranslateService,
    sessionStorageService: SessionStorageService
  ) {
    //applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
    translateService.setDefaultLang('fr');
    // if user have changed language and navigates away from the application and back to the application then use previously choosed language
    const langKey = sessionStorageService.retrieve('locale') ?? 'en';
    translateService.use(langKey);
  }
}
