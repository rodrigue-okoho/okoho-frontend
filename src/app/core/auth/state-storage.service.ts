import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StateStorageService {
  private previousUrlKey = 'previousUrl';
  private localeKey = 'locale';
  constructor(private sessionStorageService: SessionStorageService) {}

  storeUrl(url: string): void {
    this.sessionStorageService.store(this.previousUrlKey, url);
  }

  getUrl(): string | null {
    return this.sessionStorageService.retrieve(this.previousUrlKey) as string | null;
  }

  clearUrl(): void {
    this.sessionStorageService.clear(this.previousUrlKey);
  }
  storeLocale(locale: string): void {
    this.sessionStorageService.store(this.localeKey, locale);
  }

  getLocale(): string | null {
    return this.sessionStorageService.retrieve(this.localeKey);
  }

  clearLocale(): void {
    this.sessionStorageService.clear(this.localeKey);
  }
}
