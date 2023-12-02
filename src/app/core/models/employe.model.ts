import { IAccount,Account } from "./account.model";
import {IcategoryJob} from "./categoryJob.model";

export interface IEmployer {
  id?: string;
  country?: string | null;
  entreprise?: string | null;
  description?: string | null;
  foundedDate?: string | null;
  location?: string | null;
  industry?: string | null;
  website?: string | null;
  companySize?: string | null;
  dob?: string | null;
  town	?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  googleplus?: string | null;
  categoryJobs?:IcategoryJob[]|null;
  offerJobs?:[]|null;
  userAccount?:Account |null;
}

export class Employer implements IEmployer {
  constructor(public id?: string, public entreprise?: string | null, public country?: string | null,
    public userAccount?:Account |null) {}
}

export function getEmployerIdentifier(candidat: IEmployer): string | undefined {
  return candidat.id;
}
