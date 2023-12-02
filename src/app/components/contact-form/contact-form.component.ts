import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FrontService} from "../../core/services/front.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit{
  public form: FormGroup;
  constructor(protected frontService: FrontService,
              protected activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private fb: FormBuilder,
              private toaster: ToastrService,
              protected router: Router,) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [null, [Validators.required, Validators.min(8)],],
      message: ['', [Validators.required]],
    });
  }

  sendMessage() {
    this.frontService
      .saveMessage(this.form.value)
      .subscribe(
        () => {
          this.toaster.success("Successful", "Message envoyé avec success");
        },
        err => {
          this.toaster.error(this.translateService.instant('internalServerError'), "Une erreur s'est produite");

        }
      );
  }
}
