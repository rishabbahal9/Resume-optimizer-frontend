import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  onSubmit() {
    const firstName = this.signupForm.get('firstName')?.value;
    const lastName = this.signupForm.get('lastName')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    // Form validations
    try {
      if (firstName?.trim() == '') {
        throw Error($localize`First name missing`);
      } else if (lastName?.trim() == '') {
        throw Error($localize`Last name missing`);
      } else if (email?.trim() == '') {
        throw Error($localize`Email missing`);
      } else if (!email?.includes('@')) {
        throw Error($localize`Invalid email`);
      } else if (password?.trim() == '') {
        throw Error($localize`Passsword missing`);
      } else if (confirmPassword?.trim() == '') {
        throw Error($localize`Please confirm the password`);
      } else if (password != confirmPassword) {
        throw Error($localize`Passwords don't match`);
      } else {
        this.showError = false;
        this.errorMessage = '';
        this.authService
          .signup(
            firstName ? firstName : '',
            lastName ? lastName : '',
            email ? email : '',
            password ? password : '',
            confirmPassword ? confirmPassword : ''
          )
          .subscribe({
            next: (data) => {
              console.log('data:');
              console.log(data);
              this.signupSuccessful = true;
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 3000);
            },
            error: (error) => {
              this.showError = true;
              this.errorMessage =
              $localize`Couldn't register you. (Email might be already registered)`;
            },
          });
      }
    } catch (err: any) {
      this.showError = true;
      this.errorMessage = err.message;
    }
  }
}
