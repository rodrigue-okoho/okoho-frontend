import { HttpResponse } from '@angular/common/http';
import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
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
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { CountryISO } from 'ngx-intl-tel-input';
import { IAddress } from 'src/app/core/models/address.model';
import { ItemCandidat } from 'src/app/core/models/ItemCandidat.model';

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
  pdfSrc? = "http://localhost:8000/cvs/651d3f85b39aab4ffe5507d6.pdf"
  public stepOneForm: FormGroup;
  public educationForm:FormGroup;
  public workForm:FormGroup;
  public stepTwoForm:FormGroup;
  public formAddress: FormGroup;
  public formLingustic: FormGroup;
  E164PhoneNumber = '+237675066919';
  CountryISO=CountryISO;
  canEditAddress: Boolean = false;
  canEditExperience: Boolean = false;
  canEditEducation: Boolean = false;
  constructor(private activateService: ActivateService,private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private modalService: NgbModal,private cd: ChangeDetectorRef,
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
      id: [""],
      type: ["", Validators.required],
      line1: ["", Validators.required],
      line2: ["", Validators.required],
      postcode: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
    })
    this.educationForm = this.formBuilder.group({
      id: [""],
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
      id: [""],
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
    this.backService.candidatMakeCv(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<any>) => {
      //  console.log(res.body)
        this.pdfSrc=res.body.url
        console.log(this.pdfSrc)
        this.cd.detectChanges()
        this.cd.markForCheck();
      }),
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
    this.backService.candidatMakeCv(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body)
        this.pdfSrc=res.body.url
        console.log("*******************"+this.pdfSrc)
      },
      () => {
        // this.isLoading = false;
        this.onError();
      })
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
    if(!this.canEditAddress) {
      this.formAddress.value.id = null;
      this.formAddress.value.owner_id = this.candidat?.id;
    }
    console.log(this.formAddress.value)
    this.backService.candidateAddAddress(this.formAddress.value)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.formAddress.reset();
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('error.MESSAGES.SAVE_ERROR'), err.message);
      });
      this.canEditAddress = false;
  }
  saveEducation() {
    if(!this.canEditEducation) {
      this.educationForm.value.id = null;
      this.educationForm.value.itemType="education";
      this.educationForm.value.owner_id = this.candidat?.id;
    }
    console.log(this.educationForm.value)
    this.backService.candidateAddItem(this.educationForm.value)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.educationForm.reset();
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('error.MESSAGES.SAVE_ERROR'), err.message);
      });
      this.canEditEducation = false;
  }

  saveWork() {
    if(!this.canEditExperience) {
      this.workForm.value.id = null;
      this.workForm.value.itemType = "work";
      this.workForm.value.owner_id = this.candidat?.id;
    }
    console.log(this.workForm.value)
    this.backService.candidateAddItem(this.workForm.value)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.workForm.reset();
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
      this.canEditExperience = false;
  }
  openLg(contentAddress: TemplateRef<any>) {
    this.stepOneForm.reset();
    this.modalService.open(contentAddress, { size: 'lg' });
  }

  afterLoadComplete($event: any) {
    console.log($event)
  }

  // TODO Address

  loadAdress(adress: IAddress) {
    this.formAddress.patchValue({
      id: adress.id,
      type: adress.type,
      line1: adress.line1,
      line2: adress.line2,
      postcode: adress.postcode,
      city: adress.city,
      country: adress.country
    });
  }

  editAdress(adress: IAddress, contentAddress: TemplateRef<any>) {
    this.canEditAddress = true;
    this.loadAdress(adress);
    this.openLg(contentAddress);
  }

  deleteAdress(adress: IAddress) {
    this.canEditAddress = false;
    console.log(this.formAddress.value)
    this.backService.candidateAddress(adress.id)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.DELETE_SUCCESS'), 'OK');
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.DELETE_ERROR'), err.message);
      });
  }

  closeAddressModal(modal: NgbActiveModal) {
    this.canEditAddress = false;
    this.formAddress.reset();
    modal.close('Close click')
  }

  // TODO Experience

  loadWork(work: ItemCandidat) {
    this.workForm.patchValue({
      id: work.id,
      libelle: work.libelle,
      employer_name: work.employer_name,
      website: work.website,
      location: work.location,
      postcode: work.postcode,
      line1: work.line1,
      line2: work.line2,
      begin: work.begin,
      end: work.end,
      country: work.country,
      description: work.description,
    });
  }

  editExperience(work: ItemCandidat, contentWork: TemplateRef<any>) {
    this.canEditExperience = true;
    this.loadWork(work);
    this.openLg(contentWork);
  }

  deleteExperience(work: ItemCandidat) {
    console.log(this.workForm.value)
    this.backService.candidateRemoveItem(work.id)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.DELETE_SUCCESS'), 'OK');
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.DELETE_ERROR'), err.message);
      });
      this.canEditExperience = false;
  }

  closeExperienceModal(modal: NgbActiveModal) {
    this.canEditExperience = false;
    this.formAddress.reset();
    modal.close('Close click');
  }

  // TODO Education

  loadEducation(education: ItemCandidat) {
    this.educationForm.patchValue({
      id: education.id,
      libelle: education.libelle,
      traning_body: education.traning_body,
      website: education.website,
      location: education.location,
      postcode: education.postcode,
      line1: education.line1,
      line2: education.line2,
      begin: education.begin,
      end: education.end,
      country: education.country,
    });
  }

  editEducation(education: ItemCandidat, contentEducation: TemplateRef<any>) {
    this.canEditEducation = true;
    this.loadEducation(education);
    this.openLg(contentEducation);
  }

  deleteEducation(education: ItemCandidat) {
    console.log(this.educationForm.value)
    this.backService.candidateRemoveItem(education.id)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.DELETE_SUCCESS'), 'OK');
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.DELETE_ERROR'), err.message);
      });
      this.canEditEducation = false;
  }

  closeEducationModal(modal: NgbActiveModal) {
    this.canEditEducation = false;
    this.educationForm.reset();
    modal.close('Close click');
  }
}
