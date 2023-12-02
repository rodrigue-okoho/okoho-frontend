import {Component, OnInit} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";

@Component({
  selector: 'app-following-employee',
  templateUrl: './following-employee.component.html',
  styleUrls: ['./following-employee.component.scss']
})
export class FollowingEmployeeComponent   implements OnInit{
  constructor(private activateService: ActivateService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private route: ActivatedRoute,private backService:BackService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
  }

}
