import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  isLoggedIn: Boolean = false;
  userData: User | undefined = undefined;
  showError: Boolean = false;
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe({
      next: (response) => {
        this.isLoggedIn = response.isLoggedIn;
        this.userData = response.user;
      },
    });
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService
        .login(email ? email : '', password ? password : '')
        .subscribe({
          next: (data: any) => {
            // Save tokens in local storage
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('access', data.access);
            // Get user data from access token
            this.authService.getUser().subscribe({
              next: (userObj: any) => {
                const loggedInUser = new User(
                  userObj.first_name,
                  userObj.last_name,
                  userObj.email,
                  userObj.gender,
                  userObj.date_of_birth,
                  userObj.profile_picture,
                  userObj.verified,
                  data.access
                );
                this.authService.updateAuthenticationState(loggedInUser, true);
                this.showError = false;
                this.errorMessage = '';

                this.router.navigate(['/']);
              },
              error: (err) => {
                console.log(err);
                this.showError = true;
                this.errorMessage = $localize`Couldn't extract user data.`;
              },
            });
          },
          error: (error) => {
            console.log(error);
            this.showError = true;
            this.errorMessage = $localize`Invalid credentials. Check email and password.`;
          },
        });
    }
  }
}
