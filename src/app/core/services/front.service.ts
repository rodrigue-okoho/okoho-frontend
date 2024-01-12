import { Injectable } from '@angular/core';
import {ApplicationConfigService} from "../config/application-config.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICandidat} from "../models/candidat.model";
import {SearchWithPagination} from "../util/request.model";
import {createRequestOption} from "../util/request-util";
import {SearchCandidatWithPagination} from "../util/requestCandidat.model";
import {SearchEmployerWithPagination} from "../util/requestEmployer.model";
import {IEmployer} from "../models/employe.model";
import {IJob} from "../models/job.model";
import {SearchJobWithPagination} from "../util/requestJob.model";
import {IStatistic} from "../models/Statistic.model";
import {IBlog, ICommentBlog} from "../models/blog.model";
import {environment} from "../../../environments/environment";
export type EntityResponseType = HttpResponse<ICandidat>;
export type EntityArrayResponseType = HttpResponse<ICandidat[]>;
@Injectable({
  providedIn: 'root'
})
export class FrontService {
  protected resourceUrlApplyJob = this.applicationConfigService.getEndpointFor('v1/applicant-jobs');
  protected resourceUrl = this.applicationConfigService.getEndpointFor('v1/candidats');
  protected resourceUrlEmployer = this.applicationConfigService.getEndpointFor('v1/recruteurs');
  protected resourceUrlJob = this.applicationConfigService.getEndpointFor('v1/offer-jobs');
  protected resourceUrlAll = this.applicationConfigService.getEndpointFor('v1/');
  private endpointLara = `${environment.apiCv}/`;
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }
  alertSave(req: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.resourceUrlAll}alerts/save_candidat`, req);
  }
  alertSaveJob(req: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.resourceUrlAll}alerts/save_job`, req);
  }
  candidatSearch(req: SearchCandidatWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidat[]>(`${this.resourceUrl}/search/live`, { params: options, observe: 'response' });
  }
  candidatDetail(req: string): Observable<EntityResponseType> {
        return this.http.get<ICandidat>(`${this.resourceUrl}/${req}`, {observe: 'response'});
  }
  candidatQuery(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  employerSearch(req: SearchEmployerWithPagination): Observable<HttpResponse<IEmployer[]>> {
    const options = createRequestOption(req);
    return this.http.get<IEmployer[]>(`${this.resourceUrlEmployer}/search/live`, { params: options, observe: 'response' });
  }
  employerDetail(req: string): Observable<HttpResponse<IEmployer>> {
    return this.http.get<IEmployer>(`${this.resourceUrlEmployer}/${req}`, {observe: 'response'});
  }
  employerQuery(req?: any): Observable<HttpResponse<IEmployer[]>> {
    const options = createRequestOption(req);
    return this.http.get<IEmployer[]>(this.resourceUrlEmployer, { params: options, observe: 'response' });
  }
  employerTop(req?: any): Observable<HttpResponse<IEmployer[]>> {
    const options = createRequestOption(req);
    return this.http.get<IEmployer[]>(`${this.resourceUrlEmployer}/tops`, { params: options, observe: 'response' });
  }
  jobSearch(req: SearchJobWithPagination): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(`${this.resourceUrlJob}/search/jobs`, { params: options, observe: 'response' });
  }
  jobQuery(req?: any): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(`${this.resourceUrlJob}/orders`, { params: options, observe: 'response' });
  }
  jobLast(req?: any): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(this.resourceUrlJob, { params: options, observe: 'response' });
  }
  jobDetail(req: string): Observable<HttpResponse<IJob>> {
    return this.http.get<IJob>(`${this.resourceUrlJob}/${req}`, {observe: 'response'});
  }
  jobByEntreprise(entreprise?: string,req?: any): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(this.resourceUrlJob+"/entreprise/"+entreprise, { params: options, observe: 'response' });
  }
  applyJob(req: any) {
    return this.http.post<any>(`${this.resourceUrlApplyJob}`, req);
  }
  statistic(): Observable<HttpResponse<IStatistic>> {
    return this.http.get<IStatistic>(`${this.resourceUrlAll}statistics`, {observe: 'response'});
  }
  commentBlogs(blog?: string,req?: any): Observable<HttpResponse<ICommentBlog[]>> {
    const options = createRequestOption(req);
    return this.http.get<ICommentBlog[]>(`${this.resourceUrlAll}comment-blogs/`+blog, { params: options, observe: 'response' });
  }
  blogs(req?: any): Observable<HttpResponse<IBlog[]>> {
    const options = createRequestOption(req);
    return this.http.get<IBlog[]>(`${this.resourceUrlAll}blogs`, { params: options, observe: 'response' });
  }
  blogDetail(req: string): Observable<HttpResponse<IBlog>> {
    return this.http.get<IBlog>(`${this.resourceUrlAll}blogs/${req}`, {observe: 'response'});
  }
  saveComment(req: any) {
    return this.http.post<any>(`${this.resourceUrlAll}comment-blogs`, req);
  }
  saveMessage(req: any) {
    return this.http.post<any>(`${this.resourceUrlAll}save-message`, req);
  }
}
