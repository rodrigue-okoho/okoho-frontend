import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {isPlatformBrowser} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-siderbar-recruteur',
  templateUrl: './recruteur.component.html',
  styleUrls: ['./recruteur.component.scss']
})
export class RecruteurComponent {
  _path: string | undefined;
  isNavbarCollapsed = true;
  public closeResult: string="";
  public modalOpen: boolean = false;
  loading: any;
  public form: FormGroup;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private loginService: AuthService,private fb: FormBuilder,
              private router: Router,private modalService: NgbModal,private activatedRoute:ActivatedRoute
  ) {
    console.log(activatedRoute.snapshot.routeConfig?.path)
    this._path=activatedRoute.snapshot.routeConfig?.path;
    this.form = this.fb.group({
      message: [null, [Validators.required, Validators.min(8)],],
      type:['', [Validators.required]],
    });
  }
  setActivate(path:string){
    if (path==this._path){
      return "active"
    }
    return "";
  }
  deleteProfil(template:any) {
    if (isPlatformBrowser(this.platformId)) { // For SSR
      this.modalService.open(template, {
        size: 'lg',
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

  confimDelete() {
    this.modalService.dismissAll()
    console.log(this.form.value)
  }
  cancelDelete() {
    this.modalService.dismissAll()
  }
  private getDismissReason(reason: any) {

  }
  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
