import { IFileUrl } from "./FileUrl.model";

export interface IAccount {
    id?: string|null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber?:string | null;
  gender?:string | null;
    codePhone?:string | null;
    isVerify?:string | null;
    langKey	?:string | null;
    userType?:string | null;
    imageUrl?:string | null;
    activated?:string | null;
    resetDate?:string | null;
    fileUrl?:IFileUrl|null;
    roles?:[] | null;
}

  export class Account implements IAccount {
    constructor(
      public id?: string|null,
      public firstName?: string | null,
         public lastName?: string | null,
         public phoneNumber?:string | null,
                public email?:string | null,
         public codePhone?:string | null,
         public isVerify?:string | null,
         public langKey	?:string | null,
         public userType?:string | null,
         public imageUrl?:string | null,
         public activated?:string | null,
         public  resetDate?:string | null,
         public address?:string|null,
                public gender?:string|null,
         public latitude?:string|null,
         public longitude?:string|null,
         public fileUrl?:IFileUrl|null,
         public roles?:[] | null,
         ) {}
  }
  export function getAccountIdentifier(account: IAccount): string | undefined {
    return account.id;
  }
