import { Component } from '@angular/core';
import {FrontService} from "../../core/services/front.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public form: FormGroup;
  constructor(protected frontService: FrontService,
              protected activatedRoute: ActivatedRoute,
              protected router: Router,) {
  }

  sendMessage() {

  }
}
