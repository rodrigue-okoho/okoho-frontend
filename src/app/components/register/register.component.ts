import {Component, Inject, PLATFORM_ID, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {isPlatformBrowser} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {AuthServerProvider} from "../../core/auth/auth-jwt.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public closeResult: string="";
  public modalOpen: boolean = false;
  public loginform: FormGroup;
  // @ts-ignore
  @ViewChild("register", { static: false }) register: TemplateRef<any>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object
    ,private translateService: TranslateService,private authService: AuthServerProvider,
              private router: Router,private modalService: NgbModal,private fb: FormBuilder) {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      account_type:['', Validators.required],
    });
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
    const values = {
      account_type:this.loginform.value.account_type,
      email: this.loginform.value.email,
      password: this.loginform.value.password,

    };
    console.log(values);
    this.authService
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
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['activate-wait']);
          }
        },
        () => {

        }
      );
  }
}
