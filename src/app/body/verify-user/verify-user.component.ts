import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent implements OnInit {
  timeCount: number = 8;
  invalidToken: boolean = false;
  isVerified: boolean = false;
  couldntVerify: boolean = false;
  email: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (data) => {
        this.authService.verifyUser(data['verification-token']).subscribe({
          next: (data: any) => {
            this.invalidToken = false;
            if (data.success == true) {
              this.isVerified = true;
              this.email = data.email;
              this.couldntVerify = false;
            } else {
              this.isVerified = false;
              this.couldntVerify = true;
            }
            this.startRedirect();
          },
          error: (err) => {
            console.log(err);
            this.invalidToken = true;
            this.isVerified = false;
            this.couldntVerify = false;
            this.startRedirect();
          },
        });
      },
    });
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
