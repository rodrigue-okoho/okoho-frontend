import { IAccount,Account } from "./account.model";
import {IEmployer} from "./employe.model";
import {IcategoryJob} from "./categoryJob.model";
import {Icompetence} from "./competence.model";

export interface IJob {
  id?: string;
  title?: string | null;
  isActive?: boolean|false;
  jobType?: string | null;
  minSalary?: string | null;
  max_salary?: string | null;
  createdAt?: string | null;
  description?: string | null;
  categoryJob?: IcategoryJob | null;
  comptences?:Icompetence[]|null;
  recruteur?:IEmployer |null;
      careeLevel?: string | null;
      jobApplyType?:string | null;
      gender?: string | null;
      industry?: string | null;
      expiredAt?: string | null;
      categoryjobs?: string | null;
      experience?: string | null;
      externUrlApply?: string | null;
      qualification?: string | null;
      country?: string | null;
      town?: string | null;
      address?: string | null;
      applyEmail?: string | null;
      salaryType?:string | null;
}

export class Job implements IJob {
  constructor(public id?: string, public description?: string | null, public title?: string | null,
    public recruteur?:IEmployer |null,
    ) {}

}

export function getJobIdentifier(job: IJob): string | undefined {
  return job.id;
}
