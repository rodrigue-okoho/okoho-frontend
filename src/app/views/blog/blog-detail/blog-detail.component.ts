import { Component } from '@angular/core';
import {ICandidat} from "../../../core/models/candidat.model";
import {FrontService} from "../../../core/services/front.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {IBlog, ICommentBlog} from "../../../core/models/blog.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent {
  blog: IBlog | null;
  comments:ICommentBlog[]|null
  itemForm: FormGroup;
  constructor(protected frontService: FrontService,protected activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,protected router: Router, private toaster: ToastrService,
              private translateService: TranslateService) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      message: ["", Validators.required],
    })
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id)
    this.frontService.blogDetail(id as string).subscribe(
      (res: HttpResponse<IBlog>) => {
        this.blog=res.body
      },
      () => {
        // this.isLoading = false;
        this.onError();
      }
    );
    this.frontService.commentBlogs(id as string).subscribe(
      (res: HttpResponse<ICommentBlog[]>) => {
        this.comments=res.body
      },
      () => {
        // this.isLoading = false;
        this.onError();
      }
    );
  }

  private onError() {

  }

  saveMessage() {
    this.frontService.saveComment(this.itemForm.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('internalServerError'), err.message);
      });
  }
}
