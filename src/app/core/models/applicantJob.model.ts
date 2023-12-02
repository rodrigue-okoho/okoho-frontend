import {ICandidat} from "./candidat.model";
import {IJob} from "./job.model";

export interface IApplicantJob {
  id?: string;
  candidat?: ICandidat | null;
  offerJob:IJob| null;
  status?: string | null;
  createdAt?: string | null;
  updateAt?: string | null;
}
