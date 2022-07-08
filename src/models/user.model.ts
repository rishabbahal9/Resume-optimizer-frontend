export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: string,
    public dateOfBirth: string,
    private _token: string
  ) {}

  get user() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
    };
  }

  get token(){
    return this._token;
  }
}
