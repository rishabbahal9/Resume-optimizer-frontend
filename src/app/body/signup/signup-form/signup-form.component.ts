import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  showError: boolean = false;
  errorMessage: String = '';
  signupSuccessful: Boolean = false;
  showLoader: Boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    const firstName = this.signupForm.get('firstName')?.value;
    const lastName = this.signupForm.get('lastName')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (this.signupForm.valid) {
      this.showLoader = true;
      this.authService
        .signup(
          firstName ? firstName : '',
          lastName ? lastName : '',
          email ? email : '',
          password ? password : ''
        )
        .subscribe({
          next: (data) => {
            this.showLoader = false;
            this.signupSuccessful = true;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          },
          error: (error) => {
            this.showLoader = false;
            this.showError = true;
            this.errorMessage = $localize`Couldn't register you. (Email might be already registered)`;
          },
        });
    } else {
      this.showError = true;
      this.errorMessage = $localize`Form is invalid`;
    }
  }
}
