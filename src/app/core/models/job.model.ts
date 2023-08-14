import { IAccount,Account } from "./account.model";

export interface IJob {
  id?: number;
  title?: string | null;
  description?: string | null;
  offerJobs?:[]|null;
  userAccount?:Account |null;
}

export class Job implements IJob {
  constructor(public id?: number, public description?: string | null, public title?: string | null,
    public userAccount?:Account |null) {}
}

export function getJobIdentifier(job: IJob): number | undefined {
  return job.id;
}
