import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "../../components/register/register.component";
import {PasswordResetInitComponent} from "./password-reset/init/password-reset-init.component";
import {PasswordStrengthBarComponent} from "./password/password-strength-bar/password-strength-bar.component";
import {PasswordResetFinishComponent} from "./password-reset/finish/password-reset-finish.component";
import {PasswordComponent} from "./password/password.component";
import {ActivateComponent} from "./activate/activate.component";
import {RouterModule} from "@angular/router";
import {accountState} from "./account.route";
import { ActivateWaitComponent } from './activate-wait/activate-wait.component';
import {SharedModule} from "../../shared/shared.module";
import {AppModule} from "../../app.module";
import {ComponentsModule} from "../../components/components.module";



@NgModule({
  declarations: [
    ActivateComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    ActivateWaitComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(accountState),
        SharedModule,
      ComponentsModule
    ]
})
export class AccountModule { }
