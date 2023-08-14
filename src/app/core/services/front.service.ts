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
export type EntityResponseType = HttpResponse<ICandidat>;
export type EntityArrayResponseType = HttpResponse<ICandidat[]>;
@Injectable({
  providedIn: 'root'
})
export class FrontService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('v1/candidats');
  protected resourceUrlEmployer = this.applicationConfigService.getEndpointFor('v1/recruteurs');
  protected resourceUrlJob = this.applicationConfigService.getEndpointFor('v1/offer-jobs');
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) { }
  candidatSearch(req: SearchCandidatWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  candidatQuery(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICandidat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  employerSearch(req: SearchEmployerWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployer[]>(this.resourceUrlEmployer, { params: options, observe: 'response' });
  }
  employerQuery(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployer[]>(this.resourceUrlEmployer, { params: options, observe: 'response' });
  }
  jobSearch(req: SearchJobWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(this.resourceUrlJob, { params: options, observe: 'response' });
  }
  jobQuery(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJob[]>(this.resourceUrlJob, { params: options, observe: 'response' });
  }
}
