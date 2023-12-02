import { IAccount,Account } from "./account.model";
import { IFileUrl } from "./FileUrl.model";
import {ItemCandidat} from "./ItemCandidat.model";
import {IcategoryJob} from "./categoryJob.model";
import {IAddress} from "./address.model";

export interface ICandidat {
  id?: string;
  country?: string | null;
  website?: string | null;
  qualification?: string | null;
  jobTitle?: string | null;
  educationLevel?: string | null;
  expectedSalary?: string | null;
  currentSalary?: string | null;
  salaryType?: string | null;
  experienceTime?: string | null;
  town	?: string | null;
  gender	?: string | null;
  placeofborn?: string | null;
  description?: string | null;
  age?: string | null;
  dob?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  googleplus?: string | null;
  offerJobs?:[]|null;
  cvs?:IFileUrl[]|null;
  educations?:ItemCandidat[]|null;
  categoryJobs?:IcategoryJob[]|null;
  works?:ItemCandidat[]|null;
  awards?:ItemCandidat[]|null;
  addresses?:IAddress[]|null;
  userAccount?:Account |null;
}

export class Candidat implements ICandidat {
  constructor(public id?: string, public firstname?: string | null,
              public lastname?: string | null,
    public userAccount?:Account |null) {}
}

export function getCandidatIdentifier(candidat: ICandidat): string | undefined {
  return candidat.id;
}
