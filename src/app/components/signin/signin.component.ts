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
  account: Account | null = null;
  // @ts-ignore
  private user: SocialUser;
  loggedIn: boolean=false;
  // @ts-ignore
  @ViewChild("register")register: RegisterComponent;
  // @ts-ignore
  @ViewChild("signin", { static: false }) signin: TemplateRef<any>;
  // @ts-ignore
  private accessToken: string;
  constructor(@Inject(PLATFORM_ID) private platformId: Object
    ,private translateService: TranslateService,private authService: SocialAuthService,
              private loginService: AuthServerProvider,private accountService:AccountService,
              private router: Router,private modalService: NgbModal,private fb: FormBuilder) {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: ['', Validators.required],
    });

  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithGOOGLE(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.user = accessToken);
  }
  openModal() {
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
            if (this.accountService.isAuthenticated()) {

              this.modalService.dismissAll()
              //this.router.navigate(['home']);
            }
          });
        },
        () => (this.authenticationError = true)
      );

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
}
