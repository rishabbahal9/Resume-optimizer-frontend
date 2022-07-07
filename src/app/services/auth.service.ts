import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backend_url: String = environment.backend_url;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.backend_url + '/auth/token/', {
      email: email,
      password: password,
    });
  }

  logout() {
    return { loggedIn: false };
  }

  signup(
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    password: string,
  ) {
    return this.http.post(this.backend_url + '/auth/register', {
      first_name: firstName,
      last_name: lastName,
      username: firstName,
      gender: gender,
      email: email,
      password: password,
    });
  }

  resetPassword() {
    return { passwordReset: true };
  }
}
