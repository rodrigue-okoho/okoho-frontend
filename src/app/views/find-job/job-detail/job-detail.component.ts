import {Component} from '@angular/core';
import {ICandidat} from "../../../core/models/candidat.model";
import {FrontService} from "../../../core/services/front.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {IJob} from "../../../core/models/job.model";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {BackService} from "../../../core/services/back.service";
import {SigninComponent} from "../../../components/signin/signin.component";

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent {
  job: IJob | null;
  candidat: ICandidat | null = null;

  constructor(protected frontService: FrontService, protected backService: BackService,
              protected activatedRoute: ActivatedRoute,
              private localStorageService: LocalStorageService, private translateService: TranslateService,
              private sessionStorageService: SessionStorageService, private toaster: ToastrService,
              protected router: Router) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candidat = res.body
      })
    console.log(id)
    this.frontService.jobDetail(id as string).subscribe(
      (res: HttpResponse<IJob>) => {
        this.job = res.body
      },
      () => {
        // this.isLoading = false;
        this.onError();
      }
    );
  }

  private onError() {

  }

  applyJob() {
    const item = {
      "candidat": this.candidat?.id,
      "offerJob": this.job?.id
    }
    if (this.candidat==null){
      this.toaster.error(this.translateService.instant('internalServerError'), "Vous n'etes pas connecté");
    }else {
      this.frontService.applyJob(item)
        .subscribe((res: any) => {
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        }, err => {
          console.log(err);
          this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
        });
    }

  }
}
