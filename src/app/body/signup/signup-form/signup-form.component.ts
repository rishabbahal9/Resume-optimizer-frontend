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
  existingEmails: Array<String> = [];
  emailExists: Boolean = false;
  underAge: Boolean = false;
  invalidDOB: Boolean = false;
  ageThreshold: number = 18;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
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
    const gender = this.signupForm.get('gender')?.value;
    const dateOfBirth = this.signupForm.get('dateOfBirth')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (this.signupForm.valid) {
      this.showLoader = true;
      this.authService
        .signup(
          firstName ? firstName : '',
          lastName ? lastName : '',
          gender ? gender : '',
          dateOfBirth ? dateOfBirth : '',
          email ? email : '',
          password ? password : ''
        )
        .subscribe({
          next: (data) => {
            this.showLoader = false;
            this.signupSuccessful = true;
            this.showError = false;
            this.errorMessage = $localize``;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          },
          error: (error) => {
            console.log(error);
            if (error.statusText === 'Bad Request') {
              this.showError = false;
              this.errorMessage = $localize``;
              if (email && email != '') {
                this.existingEmails.push(email);
                this.emailExists = true;
              }
            } else if (error.statusText === 'Unknown Error') {
              this.showError = true;
              this.errorMessage = $localize`Unable to connect, check your connection`;
            }
            this.showLoader = false;
          },
        });
    } else {
      this.showError = true;
      this.errorMessage = $localize`Form is invalid`;
    }
  }

  checkEmailExists(emailString: String) {
    this.emailExists = this.existingEmails.includes(emailString);
  }

  getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  dobChange(dob: string) {
    const age = this.getAge(dob);
    if (age < this.ageThreshold && age >= 0) {
      this.underAge = true;
      this.invalidDOB = false;
    } else if (age < 0) {
      this.underAge = false;
      this.invalidDOB = true;
    } else {
      this.underAge = false;
      this.invalidDOB = false;
    }
  }
}
