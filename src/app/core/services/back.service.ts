import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../config/application-config.service";
import {ICandidat} from "../models/candidat.model";
import {Observable} from "rxjs";
import {IEmployer} from "../models/employe.model";
import {createRequestOption} from "../util/request-util";
import {EntityArrayResponseType} from "./front.service";
import {IJob} from "../models/job.model";
import { IFileUrl } from "../models/FileUrl.model";
import { IcategoryJob } from "../models/categoryJob.model";
import {IApplicantJob} from "../models/applicantJob.model";
import { IStatistic } from "../models/Statistic.model";
import {environment} from "../../../environments/environment";
export type EntityResponseType = HttpResponse<ICandidat>;
@Injectable({
  providedIn: 'root'
})
export class BackService {
  private endpointCV = `${environment.apiCv}/`;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('v1/');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }

  candidatMakeCv(req: any,item: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.endpointCV}api/make-cv/${req}/${item}`, {observe: 'response'});
  }
  candidatUploadImage(req: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.endpointCV}api/upload-image`, req);
  }
  categoryJobs(): Observable<HttpResponse<IcategoryJob[]>> {
    return this.http.get<IcategoryJob[]>(`${this.resourceUrl}category-jobs`, {observe: 'response'});
  }
  employerProfile(req: string): Observable<HttpResponse<IEmployer>> {
    return this.http.get<IEmployer>(`${this.resourceUrl}recruteurs/profile/${req}`, {observe: 'response'});
  }
  candidatProfile(req: string): Observable<HttpResponse<ICandidat>> {
    return this.http.get<ICandidat>(`${this.resourceUrl}candidats/profile/${req}`, {observe: 'response'});
  }
  candidatSaveProfile(req: any): Observable<HttpResponse<ICandidat>> {
    return this.http.post<any>(`${this.resourceUrl}candidats`, req);
  }
  employerJob(id?:string,req?: any): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(`${this.resourceUrl}offer-jobs/entreprise/${id}`, { params: options, observe: 'response' });
  }
  candidatAlertJob(id?:string,req?: any): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(`${this.resourceUrl}alerts/candidat/${id}`, { params: options, observe: 'response' });
  }
  employerAlertJob(id?:string,req?: any): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(`${this.resourceUrl}alerts/employer/${id}`, { params: options, observe: 'response' });
  }
  candidateAddCv(req: any) {
    return this.http.post<any>(`${this.resourceUrl}candidats/addcv`, req);
  }
  candidatFavoriteJob(id?:string,req?: any): Observable<HttpResponse<IJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(`${this.resourceUrl}offer-jobs/candidat/${id}`, { params: options, observe: 'response' });
  }
  candidatApplys(id?:string,req?: any): Observable<HttpResponse<IApplicantJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IApplicantJob[]>(`${this.resourceUrl}applicant-jobs/candidat/${id}`, { params: options, observe: 'response' });
  }
  employerApplys(id?:string,status?:string,req?: any): Observable<HttpResponse<IApplicantJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IApplicantJob[]>(`${this.resourceUrl}applicant-jobs/entreprise/${id}`, { params: options, observe: 'response' });
  }
  employerApplyByJob(job_id?:string,status?:string,req?: any): Observable<HttpResponse<IApplicantJob[]>> {
    const options = createRequestOption(req);
    return this.http.get<IApplicantJob[]>(`${this.resourceUrl}applicant-jobs/entreprise/${job_id}`, { params: options, observe: 'response' });
  }
  candidateRemoveCv(req: any) {
    return this.http.delete<any>(`${this.resourceUrl}candidats/addcv/${req}`, { observe: 'response' });
  }
  candidatCvlist(req: any): Observable<HttpResponse<IFileUrl[]>> {
    return this.http.get<IFileUrl[]>(`${this.resourceUrl}candidats/cvs/${req}`, {observe: 'response'});
  }
  candidatCv(req: any): Observable<HttpResponse<IFileUrl>> {
    return this.http.get<IFileUrl>(`${this.resourceUrl}candidats/cvs/${req}`, {observe: 'response'});
  }
  candidateAddItem(req: any) {
    return this.http.post<any>(`${this.resourceUrl}candidats/additem`, req);
  }
  candidateRemoveItem(req: any) {
    return this.http.delete<any>(`${this.resourceUrl}candidats/removeitem/${req}`, { observe: 'response' });
  }
  candidateAddAddress(req: any) {
    return this.http.post<any>(`${this.resourceUrl}candidats/address`, req);
  }
  candidateAddress(req: any) {
    return this.http.delete<any>(`${this.resourceUrl}candidats/removeaddress/${req}`, { observe: 'response' });
  }
  employerSaveProfile(req: any): Observable<HttpResponse<IEmployer>> {
    return this.http.post<any>(`${this.resourceUrl}recruteurs`, req);
  }
  jobSave(req: any): Observable<HttpResponse<IEmployer>> {
    return this.http.post<any>(`${this.resourceUrl}offer-jobs`, req);
  }
  getJob(req?: any): Observable<HttpResponse<IJob>> {
    return this.http.get<IJob>(`${this.resourceUrl}offer-jobs/${req}`, {observe: 'response'});
  }
  deleteJob(req: any) {
    return this.http.delete<any>(`${this.resourceUrl}offer-jobs/${req}`, { observe: 'response' });
  }
  employerJoblist(req?: any): Observable<HttpResponse<IJob[]>> {
    return this.http.get<IJob[]>(`${this.resourceUrl}offer-jobs/my-job/${req}`, {observe: 'response'});
  }
  statisticCandidat(req?: any): Observable<HttpResponse<IStatistic>> {
    return this.http.get<IStatistic>(`${this.resourceUrl}statistics/candidat/${req}`, {observe: 'response'});
  }
  statisticEntreprise(req?: any): Observable<HttpResponse<IStatistic>> {
    return this.http.get<IStatistic>(`${this.resourceUrl}statistics/entreprise/${req}`, {observe: 'response'});
  }
  candidateAddLanguage(req: any) {
    return this.http.post<any>(`${this.resourceUrl}candidats/languages`, req);
  }
  candidateRemoveLanguage(req: any) {
    return this.http.delete<any>(`${this.resourceUrl}candidats/remove-language/${req}`, { observe: 'response' });
  }

  candidateAddBranche(req: any) {
    return this.http.post<any>(`${this.resourceUrl}candidats/branches`, req);
  }
  candidateRemoveBranche(req: any) {
    return this.http.delete<any>(`${this.resourceUrl}candidats/remove-branch/${req}`, { observe: 'response' });
  }
}
