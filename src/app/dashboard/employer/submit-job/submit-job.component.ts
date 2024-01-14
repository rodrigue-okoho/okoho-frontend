import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import { IEmployer } from 'src/app/core/models/employe.model';
import { HttpResponse } from '@angular/common/http';
import { IcategoryJob } from 'src/app/core/models/categoryJob.model';
import {countries} from "../../../core/util/country-data-store";
@Component({
  selector: 'app-submit-job',
  templateUrl: './submit-job.component.html',
  styleUrls: ['./submit-job.component.scss']
})
export class SubmitJobComponent {
  public stepOneForm: FormGroup;
  public steptwoForm: FormGroup;
  public stepthreeForm: FormGroup;
  job_apply_type:any;
  entreprise: IEmployer|null = null;
  categories?: IcategoryJob[]| null;
  public countries:any = countries;
  
  constructor(
              private localStorageService: LocalStorageService,
              private translateService: TranslateService,
              private toaster: ToastrService, 
              private backService:BackService, 
              private fb: FormBuilder) {
    this.steptwoForm = this.fb.group({
      title: ["", Validators.required],});
    this.stepthreeForm = this.fb.group({
      title: ["", Validators.required],});
    this.stepOneForm = this.fb.group({
      title: ["", Validators.required],
      jobType: [],
      careeLevel: [],
      jobApplyType:[],
      gender: [],
      industry: [],
      minSalary: [],
      max_salary: [],
      expiredAt: [],
      description: ["", Validators.required],
      categoryjobs: [],
      experience: [],
      externUrlApply: [],
      qualification: [],
      country: [],
      town: [],
      address: [],
      applyEmail: [],
      salaryType:[],
      id_recruteur:[]

    });
  }

  ngOnInit(): void {
    this.backService.employerProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<IEmployer>) => {
        this.entreprise=res.body});

        this.backService.categoryJobs().subscribe(
          (res: HttpResponse<IcategoryJob[]>) => {
            this.categories=res.body}); 
  }

  stepOneSubmit() {
    this.stepOneForm.value.id_recruteur = this.entreprise?.id;
    console.log(this.stepOneForm.value)

    this.backService.jobSave(this.stepOneForm.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
  }

  jobaplyType(event:any) {
    console.log(event.target.value)
    this.job_apply_type=event.target.value;
  }
}
