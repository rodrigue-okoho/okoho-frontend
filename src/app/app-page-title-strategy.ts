import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppPageTitleStrategy extends TitleStrategy {
  constructor(private translateService: TranslateService) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    let pageTitle = this.buildTitle(snapshot);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => {
      document.title = title;
    });
  }
/*
  override updateTitle(routerState: RouterStateSnapshot): void {
    let pageTitle = this.buildTitle(routerState);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => {
      document.title = title;
    });
  }*/
}
