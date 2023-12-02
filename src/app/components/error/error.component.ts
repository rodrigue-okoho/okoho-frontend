import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'okoho-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorMessage?: string;
  errorKey?: string;
  langChangeSubscription?: Subscription;

  constructor(private translateService: TranslateService,  private loginService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.route.data.subscribe(routeData => {
      if (routeData['errorMessage']) {
        this.errorKey = routeData['errorMessage'];
        this.getErrorMessageTranslation();
        this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => this.getErrorMessageTranslation());
      }
    });
   this.loginService.logout();
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private getErrorMessageTranslation(): void {
    this.errorMessage = '';
    if (this.errorKey) {
      this.translateService.get(this.errorKey).subscribe(translatedErrorMessage => {
        this.errorMessage = translatedErrorMessage;
      });
    }
  }
}
