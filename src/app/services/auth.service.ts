import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backend_url: String = 'http://localhost:8000';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // return this.http.post(this.backend_url + '/signup', {
    //   email: email,
    //   password: password,
    // });
  }

  logout() {
    return { loggedIn: false };
  }

  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post(this.backend_url + '/auth/register', {
      first_name: firstName,
      last_name: lastName,
      username: firstName,
      email: email,
      password: password,
    });
  }

  resetPassword() {
    return { passwordReset: true };
  }
}
