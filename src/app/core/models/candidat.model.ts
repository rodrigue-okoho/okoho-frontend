import { IAccount,Account } from "./account.model";

export interface ICandidat {
  id?: number;
  country?: string | null;
  dob?: string | null;
  offerJobs?:[]|null;
  userAccount?:Account |null;
}

export class Candidat implements ICandidat {
  constructor(public id?: number, public firstname?: string | null, public lastname?: string | null,
    public userAccount?:Account |null) {}
}

export function getCandidatIdentifier(candidat: ICandidat): number | undefined {
  return candidat.id;
}
