import { Component } from '@angular/core';
import {ICandidat} from "../../../core/models/candidat.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FrontService} from "../../../core/services/front.service";
import {HttpResponse} from "@angular/common/http";
import * as L from "leaflet";
import {circle, latLng, marker} from "leaflet";

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.scss']
})
export class CandidatDetailComponent {
  candiadat: ICandidat | null;

  constructor(protected frontService: FrontService,protected activatedRoute: ActivatedRoute, protected router: Router) {}
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: 'okoho.de' })
    ],
    zoom: 13,
    center: latLng(51.505, -0.09)
  };
  layers = [
    circle([ 51.505, -0.09 ], { radius: 5000 }),
    marker([ 51.505, -0.09 ])
  ];
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id)
    this.frontService.candidatDetail(id as string).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candiadat=res.body
      },
      () => {
       // this.isLoading = false;
        this.onError();
      }
    );
  }

  private onError() {

  }
}
