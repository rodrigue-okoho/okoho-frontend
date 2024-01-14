import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { IJob } from './../../../core/models/job.model';
import { IEmployer } from 'src/app/core/models/employe.model';
import { BackService } from 'src/app/core/services/back.service';
import { IcategoryJob } from 'src/app/core/models/categoryJob.model';
import { countries } from "src/app/core/util/country-data-store";
import { Countries } from "src/app/core/models/Country.model";

@Component({
    selector: 'app-edit-job',
    templateUrl: './edit-job.component.html',
    styleUrls: ['./edit-job.component.scss']
  })
export class EditJobComponent implements OnInit{

    job_apply_type: any;
    Job: IJob | null = null;   
    jobForm: FormGroup | null = null;
    entreprise: IEmployer | null = null;
    countries: Countries[] = countries
    categories: IcategoryJob[] | null = []; 

    private fb = inject(FormBuilder);
    private gateway = inject(BackService);
    private route = inject(ActivatedRoute);
    private toaster = inject(ToastrService);
    private translate = inject(TranslateService);

    ngOnInit(): void {
        this.initJobFrom();
        this.getCategoryJob();
        this.getJob();
    }

    save() {
        this.jobForm?.markAllAsTouched();
        
        if(this.jobForm?.valid) {
            this.gateway.jobSave(this.jobForm?.value)
            .subscribe(
                (response) => { this.toaster.success(this.translate.instant('MESSAGES.SAVE_SUCCESS'), 'OK'); },
                (err) => { this.toaster.success(this.translate.instant('MESSAGES.SAVE_ERROR'), 'OK'); }
            );
        }
    }

    initJobFrom() {
        this.jobForm = this.fb.group({
            id: [""],
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

    getJob() {
        const job_id = this.route.snapshot.params['id'];

        if(job_id !== null && job_id !== undefined) {
            this.gateway.getJob(job_id).pipe(map((data) => data.body))
            .subscribe(
                    (response) => { 
                        if(response !== null) {
                            this.Job = response; 
                            this.loadJobFrom(response);
                        }
                    },
                    (err) => { this.toaster.error(this.translate.instant('unable.to.retrieve.job.by.id'), err.message) }
                );
            }
    }

    getCategoryJob() {
        this.gateway.categoryJobs().pipe(map((datas) => datas.body))
            .subscribe(
                (response) => { this.categories = response; },
                (err) => { this.toaster.error(this.translate.instant('unable.to.retrieve,category.job'), err.message); }
            );
    }

    jobaplyType(event:any) {
        this.job_apply_type = event.target.value;
      }

    loadJobFrom(job: IJob) {
        if(job !== null && job.recruteur !== null) {
            this.jobForm?.patchValue({
                id: job.id,
                title: job.title,
                jobType: job.jobType,
                careeLevel: job.careeLevel,
                jobApplyType: job.jobApplyType,
                gender: job.gender,
                industry: job.industry,
                minSalary: job.minSalary,
                max_salary: job.max_salary,
                expiredAt: job.expiredAt,
                description: job.description,
                categoryjobs: job.categoryjobs,
                experience: job.experience,
                externUrlApply: job.externUrlApply,
                qualification: job.qualification,
                country: job.country,
                town: job.town,
                address: job.address,
                applyEmail: job.applyEmail,
                salaryType: job.salaryType,
                id_recruteur: job.recruteur?.id
            });
        }
    }
}