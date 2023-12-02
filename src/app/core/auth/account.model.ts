export class Account {
  constructor(
    public activated: boolean,
    public roles: string[],
    public email: string,
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public userType: string,
    public imageUrl: string | null
  ) {}
}
