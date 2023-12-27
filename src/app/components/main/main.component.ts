import { Component, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRouteSnapshot, NavigationEnd, ActivatedRoute} from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'okoho-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  private renderer: Renderer2;
  is_dash=false
  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log( "-------")
        console.log(event.url.includes("dash"))
        this.is_dash=event.url.includes("dash")
        this.updateTitle();
      }
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data['pageTitle'] ?? '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }

  }
}
