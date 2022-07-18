import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-forgot-password-form',
  templateUrl: './reset-forgot-password-form.component.html',
  styleUrls: ['./reset-forgot-password-form.component.css'],
})
export class ResetForgotPasswordFormComponent implements OnInit {
  showLoader: boolean = false;
  submitSuccessful: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';

  userId: number = 0;
  token: string = '';
  isTokenValid: boolean | undefined;
  email: string = '';
  timeCount: number = 8;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (data) => {
        this.token = data['reset-password-token'];
        this.userId = +data['uid'];
        // Verifying token
        this.authService
          .verifyResetForgotPasswordToken(this.token, this.userId)
          .subscribe({
            next: (data: any) => {
              console.log('data');
              console.log(data);
              this.isTokenValid = data.valid;
              this.email = data.email;
            },
            error: (err) => {
              console.log('err');
              console.log(err);
            },
          });
      },
    });
  }

  resetForgotPasswordForm = new FormGroup({
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
    if (
      this.resetForgotPasswordForm.get('password')?.value ==
      this.resetForgotPasswordForm.get('confirmPassword')?.value
    ) {
      this.showLoader = true;
      console.log(this.resetForgotPasswordForm.get('password')?.value);
      this.authService
        .resetForgotPassword(
          this.token,
          this.userId,
          this.resetForgotPasswordForm.get('password')?.value
        )
        .subscribe({
          next: (data) => {
            console.log(data);
            this.submitSuccessful = true;
            this.startRedirect()
          },
          error: (err) => {
            console.log(err);
            this.submitSuccessful = false;
          },
          complete: () => {
            this.showLoader = false;
          },
        });
    }
  }
  startRedirect() {
    setInterval(() => {
      this.timeCount--;
      if (this.timeCount == 0) {
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
