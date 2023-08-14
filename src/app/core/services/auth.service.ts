import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ApplicationConfigService} from "../config/application-config.service";
import {Login} from "../models/login.model";
import {RegisterModel} from "../models/register.model";
import {AccountService} from "../auth/account.service";
import {AuthServerProvider} from "../auth/auth-jwt.service";
import {Account} from "../auth/account.model";

type JwtToken = {
  id_token: string;
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {}

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }
}
