import {Component, OnInit} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../core/auth/account.service";
import {Account} from "../../../core/auth/account.model";
import {Employer, IEmployer} from "../../../core/models/employe.model";
import {BackService} from "../../../core/services/back.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {HttpResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SafeUrl} from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {IcategoryJob} from "../../../core/models/categoryJob.model";
import {countries} from "../../../core/util/country-data-store";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileEmployerComponent implements OnInit {
  error = false;
  success = false;
  account: Account | null = null;
  entreprise: IEmployer|null = null;
  status = false;
  imageId: any = null;
  nameimage: any;
  place: any;
  private fileType: any;
  imageUrl: SafeUrl = '/assets/images/placeholder.png';
  itemForm: FormGroup | null = null;
  itemSocialForm: FormGroup | null = null;
  itemContactForm: FormGroup | null = null;
  languageForm: FormGroup | null = null;
  btn_status=false;
  categories?: IcategoryJob[] | any | null;
  placehoder="categories";
  public countries:any = countries;
  constructor(private activateService: ActivateService,private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService,private translateService: TranslateService,
              private sessionStorageService: SessionStorageService,private toaster: ToastrService,
              private route: ActivatedRoute,private backService:BackService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      foundedDate: ["", Validators.required],
      location: ["", Validators.required],
      description: ["", Validators.required],
      companySize: ["", Validators.required],
      website: ["", Validators.required],
      user_type: ["", Validators.required],
      categoryJobs: ["", Validators.required],
      allow_search: ["", Validators.required],
      mode: [""],
    });
    this.itemSocialForm = this.formBuilder.group({
      email: ["", Validators.required],
      user_type: ["", Validators.required],
      facebook: ["", Validators.required],
      linkedin: ["", Validators.required],
      twitter: ["", Validators.required],
      googleplus: ["", Validators.required],
      mode: [""],
    });
    this.itemContactForm = this.formBuilder.group({
      country: ["", Validators.required],
      town: ["", Validators.required],
      address: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      mode: [""],
    });

    this.languageForm =this.formBuilder.group({
      id: [""],
      montherLanguage: ["", Validators.required],
      ortherLanguage: ["", Validators.required],
      readingComprehension1: ["", Validators.required],
      readingComprehension2: ["", Validators.required],
      oralIntegration: ["", Validators.required],
      continuousSpeaking: ["", Validators.required],
      written: ["", Validators.required]
    });

    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.updateProfile();
  }
  private onError() {

  }
  private updateProfile(){
    this.backService.categoryJobs().subscribe(
      (res: HttpResponse<IcategoryJob[]>) => {
        this.categories=res.body});
    this.backService.employerProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<IEmployer>) => {
        this.entreprise=res.body
        this.btn_status= this.entreprise?.userAccount?.firstName != null;
        this.itemForm=this.formBuilder.group({
          firstName: this.entreprise?.userAccount?.firstName,
          id: this.entreprise?.id,
          user_type: this.entreprise?.userAccount?.userType,
          email: this.entreprise?.userAccount?.email,
          phoneNumber: this.entreprise?.userAccount?.phoneNumber,
          foundedDate: this.entreprise?.foundedDate,
          location: this.entreprise?.location,
          description: this.entreprise?.description,
          companySize: this.entreprise?.companySize,
          website:this.entreprise?.website,
          town:this.entreprise?.town,
          categoryJobs:this.entreprise?.categoryJobs,
          mode: "profile",
        });
        this.itemSocialForm = this.formBuilder.group({
          id: this.entreprise?.id,
          email: this.entreprise?.userAccount?.email,
          user_type: this.entreprise?.userAccount?.userType,
          facebook: this.entreprise?.facebook,
          twitter: this.entreprise?.twitter,
          linkedin: this.entreprise?.linkedin,
          googleplus: this.entreprise?.googleplus,
          mode: "sociale",

        });
        this.itemContactForm = this.formBuilder.group({
          id: this.entreprise?.id,
          email: this.entreprise?.userAccount?.email,
          user_type: this.entreprise?.userAccount?.userType,
          country: this.entreprise?.country,
          town: this.entreprise?.town,
          address: this.entreprise?.userAccount?.address,
          latitude: this.entreprise?.userAccount?.latitude,
          longitude: this.entreprise?.userAccount?.longitude,
          mode: "contact",

        });
      },
      () => {
        // this.isLoading = false;
        this.onError();
      }
    )
  }

  saveLanguage() {
    this.languageForm?.markAllAsTouched();
    console.log(this.languageForm?.value);
    if(this.languageForm?.valid){
      this.backService.candidateAddLanguage(this.languageForm?.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('error.MESSAGES.SAVE_ERROR'), err.message);
      });
    }
  }

  saveProfile() {
    this.backService.employerSaveProfile(this.itemForm?.value)
    .subscribe((res: any) => {
      this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
      this.updateProfile();
    }, err => {
      console.log(err);
      this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.error.detail);
    });
  }
  saveSociale() {
    console.log(this.itemSocialForm?.value)
    this.backService.employerSaveProfile(this.itemSocialForm?.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
  }

  saveContact() {
    console.log(this.itemContactForm?.value)
    this.backService.employerSaveProfile(this.itemContactForm?.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.error.detail);
      });
  }
  uploadCv(event:any) {
    const file = event.target.files[0];
    this.status = event.target.files.length > 0;
    if (this.status === true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader?.result;
        this.fileType = file.type;
        this.nameimage = file.name;
        const values = {
          mode: "image",
          id: this.entreprise?.id,
          email: this.entreprise?.userAccount?.email,
          user_type: this.entreprise?.userAccount?.userType,
          imageUrl: reader.result,
          name: file.name,
          type: file.type,
        };
        console.log(values)
        this.backService.employerSaveProfile(values).subscribe((result:any) => {
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
          this.imageId = result.data.id;
        }, err => {
          console.log(err);
          this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
        });
      };
    }
  }
}

