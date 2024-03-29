import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {Account} from "../../../core/auth/account.model";
import {ICandidat} from "../../../core/models/candidat.model";
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {SafeUrl} from '@angular/platform-browser';
import {IcategoryJob} from "../../../core/models/categoryJob.model";
import {countries} from "../../../core/util/country-data-store";
import {CountryISO} from "ngx-intl-tel-input";
import {Observable} from "rxjs";
import {MapDirectionsService} from "@angular/google-maps";
import {map} from "rxjs/operators";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IBanche} from "../../../core/models/branche.model";
import * as L from "leaflet";
import {circle, latLng, marker, polygon, tileLayer} from "leaflet";
import {ILanguage} from "../../../core/models/language.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public countries: any = countries;
  error = false;
  success = false;
  btn_status = false;
  account: Account | null = null;
  candidat: ICandidat | null = null;
  nameimage: any;
  place: any;
  private fileType: any;
  status = false;
  imageId: any = null;
  imageUrl: SafeUrl = '/assets/images/placeholder.png';
  salaryType: any;
  brancheForm: FormGroup | null = null;
  itemForm: FormGroup | null = null;
  itemSocialForm: FormGroup | null = null;
  itemContactForm: FormGroup | null = null;
  categories?: IcategoryJob[] | null;
  languageForm: FormGroup | null = null;
  placehoder = "categories";
  canEditLanguage: Boolean = false;
  center: google.maps.LatLngLiteral = {lat: 51.989858047086535, lng: 8.78541302551178};
  zoom = 4;
  directionResults:any

  circleCenter: google.maps.LatLngLiteral = {lat: 51.989858047086535, lng: 8.78541302551178};
  radius = 3;

  private canEditActivity: Boolean=false;

  loading = false;
  isLoading1 = false;
  isLoading2 = false;

  constructor(private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService,
              private translateService: TranslateService, 
              private toaster: ToastrService,
              private modalService: NgbModal, 
              private backService: BackService,
              mapDirectionsService: MapDirectionsService,
              private accountService: AccountService,) {
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 51.989858047086535, lng: 8.78541302551178},
      origin: {lat: 51.989858047086535, lng: 8.78541302551178},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
      mapDirectionsService.route(request).subscribe((response:any)=>{
     this.directionResults=response.result
    })
  }

  E164PhoneNumber = '+237675066919';
  @ViewChild('f') f!: NgForm;
  data = {mobile: "+237675066919"};
  CountryISO = CountryISO;
  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 22, attribution: 'okoho.de' })
    ],
    zoom: 15,
    center: latLng(51.505, -0.09)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }
  layers = [
    marker([ 51.505, -0.09 ])
  ];
  ngOnInit(): void {
    this.E164PhoneNumber = "+237675066919"
    this.backService.categoryJobs().subscribe(
      (res: HttpResponse<IcategoryJob[]>) => {
        this.categories = res.body
      });
    this.brancheForm = this.formBuilder.group({
      branch: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      id: ["", [Validators.required]],
      owner_id: ["", [Validators.required]],
    })
    this.itemForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      placeofborn: ["", [Validators.required]],
      email: ["", [Validators.required]],
      categoryJobs: ["", Validators.required],
      phoneNumber: ["", [Validators.required]],
      codePhone: ["", [Validators.required]],
      country: ["", Validators.required],
      countryofborn: ["", Validators.required],
      qualification: ["", Validators.required],
      jobTitle: ["", Validators.required],
      educationLevel: ["", Validators.required],
      expectedSalary: ["", Validators.required],
      currentSalary: ["", Validators.required],
      salaryType: ["", Validators.required],
      experienceTime: ["", Validators.required],
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
      readingComprehension1: ["", Validators.required],
      readingComprehension2: ["", Validators.required],
      oralIntegration: ["", Validators.required],
      written: ["", Validators.required]
    });
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.updateProfile();
  }

  private onError() {

  }

  onCountrySelected(country: any) {
    console.log(country);
  }

  private updateProfile() {
    this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candidat = res.body
        this.salaryType=this.candidat?.salaryType;
        this.btn_status = this.candidat?.userAccount?.firstName != null;
        this.itemForm = this.formBuilder.group({
          firstName: this.candidat?.userAccount?.firstName,
          lastName: this.candidat?.userAccount?.lastName,
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          placeofborn: this.candidat?.placeofborn,
          countryofborn:this.candidat?.countryofborn,
          gender: this.candidat?.gender,
          phoneNumber: this.candidat?.userAccount?.phoneNumber,
          codePhone: this.candidat?.userAccount?.codePhone,
          phone: this.candidat?.userAccount?.codePhone + this.candidat?.userAccount?.phoneNumber!,
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
          dob: this.candidat?.dob,
          address: this.candidat?.userAccount?.codePhone,
          categoryJobs: this.candidat?.categoryJobs,
          mode: "profile",

        });
        this.itemSocialForm = this.formBuilder.group({
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          user_type: this.candidat?.userAccount?.userType,
          facebook: this.candidat?.facebook,
          twitter: this.candidat?.twitter,
          linkedin: this.candidat?.linkedin,
          googleplus: this.candidat?.googleplus,
          mode: "sociale",

        });
        this.itemContactForm = this.formBuilder.group({
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          user_type: this.candidat?.userAccount?.userType,
          country: this.candidat?.country,
          town: this.candidat?.town,
          address: this.candidat?.userAccount?.address,
          latitude: this.candidat?.userAccount?.latitude,
          longitude: this.candidat?.userAccount?.longitude,
          mode: "contact",

        });
        console.log(this.itemForm.value.phone);
      },
      () => {
        this.onError();
      }
    )
  }

  countryChange() {
    console.log("test")
  }

  saveProfile() {
    if(this.itemForm !== null) {
      this.loading = true;
      this.itemForm.value.phoneNumber = this.itemForm.value.phone.number;
      this.itemForm.value.codePhone = this.itemForm.value.phone.dialCode;
      this.itemForm.value.salaryType = this.salaryType;
      this.backService.candidatSaveProfile(this.itemForm?.value)
        .subscribe((res: any) => {
          console.log(this.loading)
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
          this.updateProfile();
          this.loading = false;
        }, err => {
          console.log(err);
          this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.error.detail);
        });
        this.loading = false;
      }    
  }

  saveSociale() {
    this.isLoading1 = true;
    this.backService.candidatSaveProfile(this.itemSocialForm?.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
        this.isLoading1 = false;
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
      this.isLoading1 = false;
  }

  saveContact() {
    this.isLoading2 = true;
    this.backService.candidatSaveProfile(this.itemContactForm?.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
        this.isLoading2 = false;
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
      this.isLoading2 =false;
  }

  uploadCv(event: any) {
    const file = event.target.files[0];
    this.status = event.target.files.length > 0;
    if (this.status === true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader?.result!;
        this.fileType = file.type;
        this.nameimage = file.name;
        const values = {
          mode: "image",
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          user_type: this.candidat?.userAccount?.userType,
          imageUrl: reader.result,
          name: file.name,
          type: file.type,
        };
        this.backService.candidatUploadImage(values).subscribe((result: any) => {
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
          this.imageId = result.id;
          this.accountService.fetch().subscribe(account => (this.account = account));
        });
      };
    }
  }

  ngAfterViewInit(): void {
    this.data = {mobile: '+237675066919'};
  }

  onchange() {
    console.log("test")
  }

  searchPosition() {

  }

  openLg(contentAddress: any) {
    this.brancheForm?.reset();
    this.modalService.open(contentAddress, { size: 'lg' });
  }

  closeModal(modal:NgbActiveModal) {
    this.brancheForm?.reset();
    modal.close('Close click')
  }

  saveActivity() {
    if(this.brancheForm !== null) {
      if(!this.canEditActivity ) {
        this.brancheForm.value.id = null;
        this.brancheForm.value.owner_id = this.candidat?.id;
      }
      console.log(this.canEditActivity)
      this.backService.candidateAddBranche(this.brancheForm.value)
        .subscribe((res: any) => {
          this.updateProfile()
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
          this.brancheForm?.reset();
          this.modalService.dismissAll();
        }, err => {
          console.log(err);
          this.toaster.error(this.translateService.instant('error.MESSAGES.SAVE_ERROR'), err.message);
        });
      this.canEditActivity = false;
    }
  }

  editBranch(b: IBanche, contentBranche: TemplateRef<any>) {
    this.canEditActivity = true;
    this.loadBranch(b);
    this.openLg(contentBranche);
  }

  loadBranch(work: IBanche) {
    this.brancheForm?.patchValue({
      id: work.id,
      branch: work.branch,
      experience: work.experience
    });
  }

  deleteBranch(b: any) {
    this.backService.candidateRemoveBranche(b.id)
      .subscribe((res: any) => {
        this.updateProfile()
        this.toaster.success(this.translateService.instant('MESSAGES.DELETE_SUCCESS'), 'OK');
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.DELETE_ERROR'), err.message);
      });
    this.canEditActivity = false;
  }

  loadLanguage(language: ILanguage) {
    this.languageForm?.patchValue({
      id: language.id,
      montherLanguage: language.montherLanguage,
      ortherLanguage: language.ortherLanguage,
      readingComprehension1: language.readingComprehension1,
      readingComprehension2: language.readingComprehension2,
      oralIntegration: language.oralIntegration,
      continuousSpeaking: language.continuousSpeaking,
      written: language.written
    });
  }

  editLanguage(language: ILanguage, contentLanguage: TemplateRef<any>) {
    this.canEditLanguage = true;
    this.loadLanguage(language);
    this.openLg(contentLanguage);
  }

  deleteLanguage(language: ILanguage) {
    this.backService.candidateRemoveLanguage(language.id)
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
    this.canEditLanguage = false;
  }

  closeLanguageModal(modal: NgbActiveModal) {
    this.canEditLanguage = false;
    this.languageForm?.reset();
    modal.close('Close click');
  }
  saveLanguage() {
    if(this.languageForm !== null) {
      if(!this.canEditLanguage) {
        this.languageForm.value.id = null;
        this.languageForm.value.owner_id = this.candidat?.id;
      }
      console.log(this.languageForm.value)
      this.backService.candidateAddLanguage(this.languageForm.value)
        .subscribe((res: any) => {
          this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
            (res: HttpResponse<ICandidat>) => {
              this.candidat = res.body})
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
          this.languageForm?.reset();
          this.modalService.dismissAll();
        }, err => {
          console.log(err);
          this.toaster.error(this.translateService.instant('error.MESSAGES.SAVE_ERROR'), err.message);
        });
      this.canEditLanguage = false;
    }
  }
}
