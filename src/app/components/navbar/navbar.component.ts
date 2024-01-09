import {Component, HostListener, OnInit, ViewChild,inject, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import {VERSION} from "../../core/app.constants";
import {Account} from "../../core/auth/account.model";
import {SigninComponent} from "../signin/signin.component";
import {AccountService} from "../../core/auth/account.service";
import {LANGUAGES} from "../../core/config/language.constants";
import {AuthService} from "../../core/services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
declare var $: any;
@Component({
  selector: 'okoho-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  showDashboard = false;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  languages = LANGUAGES;
  isNavbarFixed: boolean = false;
  is_mobile:boolean=false;
  private modalService = inject(NgbModal);
  // @ts-ignore
  @ViewChild("signin")signin: SigninComponent;
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100) {
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }
  _path: string | undefined;
  constructor(
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private loginService: AuthService,
    private router: Router,private activatedRoute:ActivatedRoute
  ) {
   // console.log(activatedRoute.snapshot.routeConfig?.path)
    this._path=this.activatedRoute.snapshot.routeConfig?.path;
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION;
    }
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }
  setActivate(path:string){
    if (path==this._path){
      return "current"
    }
    return "";
  }
  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
    this.modalService.dismissAll()
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  showMenu(content: TemplateRef<any>) {
    this.is_mobile=!this.is_mobile;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
       // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
      //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  showSiderBar() {
    this.showDashboard=!this.showDashboard
  }

  closeMenu() {
    this.modalService.dismissAll()
  }
}
