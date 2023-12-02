import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from "./main/main.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {ErrorComponent} from "./error/error.component";
import {ActiveMenuDirective} from "./navbar/active-menu.directive";
import {FooterComponent} from "./footer/footer.component";
import {RegisterComponent} from "./register/register.component";
import {SigninComponent} from "./signin/signin.component";
import {PasswordStrengthComponent} from "./password-strength/password-strength.component";
import {ContactFormComponent} from "./contact-form/contact-form.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [MainComponent, NavbarComponent, ErrorComponent,
    ActiveMenuDirective, FooterComponent, RegisterComponent, SigninComponent,
    PasswordStrengthComponent, ContactFormComponent],
  exports: [
    SigninComponent, ContactFormComponent, RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule {
}
