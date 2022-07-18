import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor() {}

  ngOnInit(): void {}
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

  onSubmit() {}
}
