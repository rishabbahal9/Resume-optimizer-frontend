import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService
      .login(email ? email : '', password ? password : '')
      .subscribe({
        next: (data: any) => {
          console.log(data);
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
                data.access
              );
              console.log("loggedInUser");
              console.log(loggedInUser);
              this.authService.updateAuthenticationState(loggedInUser, true);
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
