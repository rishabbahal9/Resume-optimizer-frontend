import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css'],
})
export class ForgotPasswordFormComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  forgotpasswordForm = new FormGroup({
    email: new FormControl(''),
  });

  onSubmit() {
    console.log(this.authService.resetPassword());
  }
}
