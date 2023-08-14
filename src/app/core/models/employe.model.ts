import { IAccount,Account } from "./account.model";

export interface IEmployer {
  id?: number;
  country?: string | null;
  entreprise?: string | null;
  dob?: string | null;
  offerJobs?:[]|null;
  userAccount?:Account |null;
}

export class Employer implements IEmployer {
  constructor(public id?: number, public entreprise?: string | null, public country?: string | null,
    public userAccount?:Account |null) {}
}

export function getEmployerIdentifier(candidat: IEmployer): number | undefined {
  return candidat.id;
}
