export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: string,
    public dateOfBirth: string,
    public profilePicture: string,
    private _token: string
  ) {}

  get user() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      profilePicture: this.profilePicture
    };
  }

  get token(){
    return this._token;
  }
}
