import {Component, OnInit} from '@angular/core';
import {Account} from "../../../core/auth/account.model";
import {ICandidat} from "../../../core/models/candidat.model";
import {ActivateService} from "../activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";

@Component({
  selector: 'app-activate-wait',
  templateUrl: './activate-wait.component.html',
  styleUrls: ['./activate-wait.component.scss']
})
export class ActivateWaitComponent implements OnInit{
  account: Account | null = null;
  constructor(private activateService: ActivateService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private route: ActivatedRoute,private backService:BackService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
   // this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
}
