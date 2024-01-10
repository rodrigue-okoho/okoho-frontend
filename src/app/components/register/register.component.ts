import {Component, Inject, PLATFORM_ID, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {isPlatformBrowser} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {AuthServerProvider} from "../../core/auth/auth-jwt.service";
import {FacebookLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public closeResult: string="";
  public modalOpen: boolean = false;
  public loginform: FormGroup;
  loading = false;
  showPassword = false;
  strongPassword = false;
  submitted = false;
  working = false;
  complete = false;
  public passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/;
  // @ts-ignore
  @ViewChild("register", { static: false }) register: TemplateRef<any>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private authService: SocialAuthService
    ,private translateService: TranslateService,private loginService: AuthServerProvider,
              private toaster: ToastrService,
              private router: Router,private modalService: NgbModal,private fb: FormBuilder) {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)],],
      account_type:['', [Validators.required]],
    });
  }
  get f() {
    return this.loginform.controls;
  }

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }
  openModal() {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.modalService.open(this.register, {
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
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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
  onShowPasswordClick() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.loading = true;
    const values = {
      account_type:this.loginform.value.account_type,
      email: this.loginform.value.email,
      password: this.loginform.value.password,

    };
    console.log(values);
    this.loginService
      .register({
        email: this.loginform.value.email,
        password: this.loginform.value.password,
        user_type: this.loginform.value.account_type,
      })
      .subscribe(
        () => {
          console.log("response ok")
          this.modalService.dismissAll()
          this.router.navigate(['account/activate-wait']);
          if (!this.router.getCurrentNavigation()) {
            this.router.navigate(['activate-wait']);
          }
        },
        (error) => {
          console.log(error)
          this.toaster.error(this.translateService.instant('error.http.400'), "An error has occurred");
          this.loading = false
        }
      );
  }
}
