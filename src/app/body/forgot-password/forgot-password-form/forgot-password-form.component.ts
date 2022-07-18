import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css'],
})
export class ForgotPasswordFormComponent implements OnInit {
  showLoader: boolean = false;
  isSuccess: boolean = false;
  timeCount: number = 8;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  forgotpasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  onSubmit() {
    const email = this.forgotpasswordForm.get('email')?.value;
    if (this.forgotpasswordForm.valid) {
      this.showLoader=true;
      this.authService.forgotPasswordSubmit(email ? email : '').subscribe({
        /**
         * Weather success failiure, we will show success message
         * to avoid revealing information to hackers
         */
        next: (data: any) => {
          this.isSuccess = data.success;
          if (data.success) this.startRedirect();
        },
        error: (err) => {
          console.log(err);
          this.isSuccess = true;
          this.startRedirect();
        },
        complete:()=>{
          this.showLoader=false;
        }
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
