import { Component } from '@angular/core';
import {FrontService} from "../../core/services/front.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import * as L from "leaflet";
import {circle, latLng, marker, polygon, tileLayer} from "leaflet";

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
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: latLng(46.879966, -121.726909)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }
  layers = [
    circle([ 46.95, -122 ], { radius: 5000 }),
    polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
    marker([ 46.879966, -121.726909 ])
  ];
/*  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };*/
  sendMessage() {

  }
}
