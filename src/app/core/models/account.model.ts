export interface IAccount {
    id?: number;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?:string | null;
    codePhone?:string | null;
    isVerify?:string | null;
    langKey	?:string | null;
    userType?:string | null;
    imageUrl?:string | null;
    activated?:string | null;
    resetDate?:string | null;
    roles?:[] | null;
}
  
  export class Account implements IAccount {
    constructor(public id?: number, public firstName?: string | null,
         public lastName?: string | null,
         public phoneNumber?:string | null,
         public codePhone?:string | null,
         public isVerify?:string | null,
         public langKey	?:string | null,
         public userType?:string | null,
         public imageUrl?:string | null,
         public activated?:string | null,
         public  resetDate?:string | null,
         public roles?:[] | null,
         ) {}
  }
  
  export function getAccountIdentifier(account: IAccount): number | undefined {
    return account.id;
  }