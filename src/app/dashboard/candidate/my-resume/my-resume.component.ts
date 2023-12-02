import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import { ICandidat } from 'src/app/core/models/candidat.model';
import { Account } from 'src/app/core/models/account.model';
import { HttpResponse } from '@angular/common/http';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-my-resume',
  templateUrl: './my-resume.component.html',
  styleUrls: ['./my-resume.component.scss']
})
export class MyResumeComponent  implements OnInit{
  account: Account | null = null;
  candidat: ICandidat | null = null;
  public form: FormGroup;
  constructor(private activateService: ActivateService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private route: ActivatedRoute,private backService:BackService,
              private modalService: NgbModal,private fb: FormBuilder,
              private translateService: TranslateService,private toaster: ToastrService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      location: ['', [Validators.required]],
      libelle: ['', Validators.required],
      begin: ['', Validators.required],
      end: ['', Validators.required],
      itemType: ['', Validators.required],
      description: ['', Validators.required],
      id: [],
    });
    this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candidat = res.body})
  }
  openLg(content:any) {
    this.form.reset();
    this.modalService.open(content, { size: 'md' });
  }

  saveEducation() {

    this.form.value.itemType="education";
    this.form.value.id=this.candidat?.id;
    console.log(this.form.value)
    this.backService.candidateAddItem(this.form.value)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('error.MESSAGES.SAVE_ERROR'), err.message);
      });
  }

  saveWork() {
    this.form.value.itemType="work";
    this.form.value.id=this.candidat?.id;
    console.log(this.form.value)
    this.backService.candidateAddItem(this.form.value)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
  }

  saveAward() {
    this.form.value.itemType="award";
    this.form.value.id=this.candidat?.id;
    console.log(this.form.value)
    this.backService.candidateAddItem(this.form.value)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
  }
}
