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
    user: User | null;
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
    const refresh = localStorage.getItem('refresh');
    // Make request to backend
    if (refresh) {
      this.http
        .post(this.backend_url + '/auth/logout', { refresh: refresh })
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
    // remove from subject isLoggedIn false
    this.isLoggedInSubject.next({ user: null, isLoggedIn: false });
    // remove access and refresh from localStorage
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
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

  updateAuthenticationState(user: User | null, isLoggedIn: Boolean) {
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
            userObj.profile_picture,
            access ? access : ''
          );
          console.log('loggedInUser');
          console.log(loggedInUser);
          this.updateAuthenticationState(loggedInUser, true);
        },
        error: (err) => {
          console.log(err);
          // Get new access token
          this.getNewAccessToken();
        },
      });
    } else {
      this.updateAuthenticationState(null, false);
    }
  }
  getNewAccessToken() {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      this.http
        .post(this.backend_url + '/auth/token/refresh/', { refresh: refresh })
        .subscribe({
          next: (data: any) => {
            console.log('refresh data');
            console.log(data);
            if (data.access) {
              // update access token everywhere
              localStorage.setItem('access', data.access);
              // retry last request
              this.getUser().subscribe({
                next: (userObj: any) => {
                  const loggedInUser = new User(
                    userObj.first_name,
                    userObj.last_name,
                    userObj.email,
                    userObj.gender,
                    userObj.date_of_birth,
                    userObj.profile_picture,
                    data.access
                  );
                  console.log('loggedInUser');
                  console.log(loggedInUser);
                  this.updateAuthenticationState(loggedInUser, true);
                },
                error: (err) => {
                  console.log(err);
                  // Don't do anything here otherwise will go in loop
                },
              });
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
