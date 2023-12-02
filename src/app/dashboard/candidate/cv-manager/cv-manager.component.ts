import { HttpResponse } from '@angular/common/http';
import {Component, OnInit, TemplateRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AccountService } from 'src/app/core/auth/account.service';
import { ICandidat } from 'src/app/core/models/candidat.model';
import { IFileUrl } from 'src/app/core/models/FileUrl.model';
import { IJob } from 'src/app/core/models/job.model';
import { BackService } from 'src/app/core/services/back.service';
import { ActivateService } from 'src/app/views/account/activate/activate.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-cv-manager',
  templateUrl: './cv-manager.component.html',
  styleUrls: ['./cv-manager.component.scss']
})
export class CvManagerComponent implements OnInit{
  cvs?: IFileUrl[]| null = null;
  status = false;
  candidat: ICandidat | null = null;
  countries=["en","de"]
  pdfSrc? = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  public stepOneForm: FormGroup;
  public educationForm:FormGroup;
  public workForm:FormGroup;
  public stepTwoForm:FormGroup;
  public formAddress: FormGroup;
  public formLingustic: FormGroup;
  E164PhoneNumber = '+237675066919';
  CountryISO=CountryISO;
  constructor(private activateService: ActivateService,private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private modalService: NgbModal,
              private toaster: ToastrService,private translateService: TranslateService,
              private route: ActivatedRoute,private backService:BackService,
              private accountService: AccountService,) {
    this.E164PhoneNumber="+237675066919"

  }

  ngOnInit(): void {
    this.stepOneForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      placeofborn: ["", [Validators.required]],
      email: ["", [Validators.required]],
      categoryJobs: ["", Validators.required],
      phoneNumber: ["", [Validators.required]],
      country: ["", Validators.required],
      qualification: ["", Validators.required],
      jobTitle: ["", Validators.required],
      educationLevel: ["", Validators.required],
      expectedSalary: ["", Validators.required],
      currentSalary: ["", Validators.required],
      salaryType: ["", Validators.required],
      experienceTime: ["", Validators.required],
      website: ["", Validators.required],
      town: ["", Validators.required],
      description: ["", Validators.required],
      user_type: ["", Validators.required],
      age: ["", Validators.required],
      address: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      facebook: ["", Validators.required],
      linkedin: ["", Validators.required],
      twitter: ["", Validators.required],
      googleplus: ["", Validators.required],
      categories: ["", Validators.required],
      mode: [""],
    });
    this.formAddress = this.formBuilder.group({
      type: ["", Validators.required],
      line1: ["", Validators.required],
      line2: ["", Validators.required],
      postcode: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
    })
    this.educationForm = this.formBuilder.group({
      libelle: ["", Validators.required],
      traning_body: ["", Validators.required],
      website: ["", Validators.required],
      location: ["", Validators.required],
      postcode: ["", Validators.required],
      line1: ["", Validators.required],
      line2: ["", Validators.required],
      begin: ["", Validators.required],
      end: ["", Validators.required],
      country: ["", Validators.required],
    })
    this.workForm = this.formBuilder.group({
      libelle: ["", Validators.required],
      employer_name: ["", Validators.required],
      website: ["", Validators.required],
      location: ["", Validators.required],
      postcode: ["", Validators.required],
      line1: ["", Validators.required],
      line2: ["", Validators.required],
      begin: ["", Validators.required],
      end: ["", Validators.required],
      country: ["", Validators.required],
      description:["", Validators.required],
    })
    /*this.stepOneForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
      email: [],
      gender: [],
      phoneNumber: [],
      dob: [],
      location: [],
      description: [],
      companySize: [],
      website: [],
      user_type: [],
      facebook: [],
      linkedin: [],
      twitter: [],
      googleplus: [],
      mode: [""],
    });*/
    this.updateProfile()
  }
  getCv(){
    this.backService.candidatCv( this.candidat?.id).subscribe(
      (res: HttpResponse<IFileUrl>) => {
        console.log(res.body)
        this.pdfSrc=res.body?.url
       // this.candidat = res.body
      })
      ,
      () => {
        // this.isLoading = false;
        this.onError();
      }
  }
  private updateProfile(){
    this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candidat = res.body
        this.cvs =this.candidat?.cvs;
        this.stepOneForm = this.formBuilder.group({
          firstName: this.candidat?.userAccount?.firstName,
          lastName: this.candidat?.userAccount?.lastName,
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          phoneNumber: this.candidat?.userAccount?.phoneNumber,
          placeofborn:this.candidat?.placeofborn,
          phone:this.candidat?.userAccount?.codePhone +this.candidat?.userAccount?.phoneNumber,
          user_type: this.candidat?.userAccount?.userType,
          country: this.candidat?.country,
          qualification: this.candidat?.qualification,
          jobTitle: this.candidat?.jobTitle,
          educationLevel: this.candidat?.educationLevel,
          expectedSalary: this.candidat?.expectedSalary,
          currentSalary: this.candidat?.currentSalary,
          salaryType: this.candidat?.salaryType,
          experienceTime: this.candidat?.experienceTime,
          town: this.candidat?.town,
          description: this.candidat?.description,
          age: this.candidat?.age,
          gender: this.candidat?.gender,
          website: this.candidat?.website,
          dob: this.candidat?.dob,
          address: this.candidat?.userAccount?.codePhone,
          categoryJobs:this.candidat?.categoryJobs,
          mode: "profile",

        });
      },
      () => {
        // this.isLoading = false;
        this.onError();
      }
    )
  }
  onError() {
    throw new Error('Method not implemented.');
  }
  uploadCv(event:any) {
    const file = event.target.files[0];
    this.status = event.target.files.length > 0;
    if (this.status === true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const values = {
          id: this.candidat?.id,
          url: reader.result,
          name: file.name,
          type: file.type,
        };
        console.log(values)
        this.backService.candidateAddCv(values).subscribe((result:any) => {
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');

        });
      };
    }
  }

  stepOneSubmit() {
    console.log(this.stepOneForm.value)
    this.backService.candidatSaveProfile(this.stepOneForm.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.error.detail);
      });
  }

  addCountry() {
    this.countries?.push("cm");
    console.log(this.countries)
  }

  saveAddress() {
    this.formAddress.value.id=this.candidat?.id;
    console.log(this.formAddress.value)
    this.backService.candidateAddAddress(this.formAddress.value)
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
  saveEducation() {

    this.educationForm.value.itemType="education";
    this.educationForm.value.id=this.candidat?.id;
    console.log(this.educationForm.value)
    this.backService.candidateAddItem(this.educationForm.value)
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
    this.workForm.value.itemType="work";
    this.workForm.value.id=this.candidat?.id;
    console.log(this.workForm.value)
    this.backService.candidateAddItem(this.workForm.value)
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
  openLg(contentAddress: TemplateRef<any>) {
    this.stepOneForm.reset();
    this.modalService.open(contentAddress, { size: 'lg' });
  }
}
