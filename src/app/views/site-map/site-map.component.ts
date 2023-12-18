import { Component } from '@angular/core';
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent {
  pdfSrc?:SafeUrl = "http://localhost:8000/cvs/651d3f85b39aab4ffe5507d6.pdf"
}
