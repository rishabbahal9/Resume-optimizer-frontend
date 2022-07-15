import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent implements OnInit {
  invalidToken: boolean = false;
  isVerified: boolean = false;
  couldntVerify: boolean = false;
  email: string = '';
  constructor(
    private route: ActivatedRoute,
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
          },
          error: (err) => {
            console.log(err);
            this.invalidToken = true;
            this.isVerified = false;
            this.couldntVerify = false;
          },
        });
      },
    });
  }
}
