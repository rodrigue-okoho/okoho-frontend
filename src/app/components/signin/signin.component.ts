import {Component, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {isPlatformBrowser} from "@angular/common";
import {RegisterComponent} from "../register/register.component";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser
} from "@abacritt/angularx-social-login";
import {AuthService} from "../../core/services/auth.service";
import {AuthServerProvider} from "../../core/auth/auth-jwt.service";
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../core/auth/account.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
  authenticationError = false;
  public closeResult: string="";
  public modalOpen: boolean = false;
  public loginform: FormGroup;
  loading = false;
  account: Account | null = null;
  // @ts-ignore
  private user: SocialUser;
  loggedIn: boolean=false;
  showPassword = false;
  submitted = false;
  working = false;
  complete = false;
  strongPassword = false;
  // @ts-ignore
  @ViewChild("register")register: RegisterComponent;
  // @ts-ignore
  @ViewChild("signin", { static: false }) signin: TemplateRef<any>;
  public passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/;
  // @ts-ignore
  private accessToken: string;
  constructor(@Inject(PLATFORM_ID) private platformId: Object
    ,private translateService: TranslateService,private authService: SocialAuthService,
    private toaster: ToastrService,
              private loginService: AuthServerProvider,private accountService:AccountService,
              private router: Router,private modalService: NgbModal,private fb: FormBuilder) {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)],],
      rememberMe: ['', Validators.required],
    });

  }
  get f() {
    return this.loginform.controls;
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }
  public checkingPasswords(formGroup: FormGroup) {
    if (
      formGroup.controls['password'].value &&
      formGroup.controls['password'].value.length >= 8 &&
      formGroup.controls['password'].value.length <= 16
    ) {
      return formGroup.controls['password'].value === formGroup.controls['password'].value ? false : { "notMatched": true }
    }
    return false;
  }
  checkValidations(control:any, type:any) {
    switch (type) {
      case 'special-character':
        return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value);
      case 'number':
        return /\d/.test(control.value);
      case 'lowercase':
        return /[a-z]/.test(control.value);
      case 'uppercase':
        return /[A-Z]/.test(control.value);
      case 'length':
        return control.value.length >= 8 && control.value.length <= 16;
      default:
        return false
    }
  }
  get password(): any {
    return this.loginform.get('password');
  }
  get email(): any {
    return this.loginform.get('email');
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithGOOGLE(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.user = accessToken);
  }
  openModal() {
    this.loginform.reset();
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.modalService.open(this.signin, {
        size: 'md',
        ariaLabelledBy: 'modal',
        centered: true,
        windowClass: 'popup',
        backdrop:'static'
      }).result.then((result) => {
        this.modalOpen = true;
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }
  openRegister(){
    this.modalService.dismissAll()
    this.register.openModal();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.loading = true;
    this.loginService.logout();
    const values = {
        email: this.loginform.value.email,
        password: this.loginform.value.password,

    };
    console.log(values);
    this.loginService
      .login({
        email: this.loginform.value.email,
        password: this.loginform.value.password,
        rememberMe: this.loginform.value.rememberMe,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          this.modalService.dismissAll()
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
          this.accountService.identity().subscribe(() => {
            this.loading = false;
            console.log("edrr");
            if (this.accountService.isAuthenticated()) {

              this.modalService.dismissAll()
              //this.router.navigate(['home']);
            }
          });
        },
         err => {
          this.toaster.error(this.translateService.instant('internalServerError'), "Mot de passe ou email incorrect");
          this.loading = false
        }
      );

  }
  onShowPasswordClick() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {

        this.modalService.dismissAll()
        //this.router.navigate(['home']);
      }
    });
   /* this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });*/
  }

  cancel() {

  }
}
