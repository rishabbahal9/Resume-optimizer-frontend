import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new Subject<{
    user: User;
    isLoggedIn: Boolean;
  }>();

  backend_url: String = environment.backend_url;
  constructor(private http: HttpClient) {}

  getIsLoggedIn(): Observable<any> {
    return this.isLoggedInSubject.asObservable();
  }

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
    dateOfBirth: string,
    email: string,
    password: string
  ) {
    return this.http.post(this.backend_url + '/auth/register', {
      first_name: firstName,
      last_name: lastName,
      username: firstName,
      gender: gender,
      date_of_birth: dateOfBirth,
      email: email,
      password: password,
    });
  }

  resetPassword() {
    return { passwordReset: true };
  }

  getUser() {
    return this.http.get(this.backend_url + '/auth/user');
  }

  updateAuthenticationState(user: User, isLoggedIn: Boolean) {
    this.isLoggedInSubject.next({ user: user, isLoggedIn: isLoggedIn });
  }

  autoLogin() {
    console.log('autologin');
    var access = localStorage.getItem('access');
    if (access) {
      this.getUser().subscribe({
        next: (userObj: any) => {
          const loggedInUser = new User(
            userObj.first_name,
            userObj.last_name,
            userObj.email,
            userObj.gender,
            userObj.date_of_birth,
            access?access:''
          );
          console.log('loggedInUser');
          console.log(loggedInUser);
          this.updateAuthenticationState(loggedInUser, true);
        },
        error: (err) => {
          console.log(err);
        },
    })
    } else {
      this.updateAuthenticationState(new User('', '', '', '', '', ''), false);
    }
  }
}
