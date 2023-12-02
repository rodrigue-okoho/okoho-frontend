import { Component } from '@angular/core';
import {ICandidat} from "../../../core/models/candidat.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FrontService} from "../../../core/services/front.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.scss']
})
export class CandidatDetailComponent {
  candiadat: ICandidat | null;

  constructor(protected frontService: FrontService,protected activatedRoute: ActivatedRoute, protected router: Router) {}

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
