import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: User = new User('', '', '', '', '', '', false, '');
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data: any) => {
        console.log(data.gender)
        console.log(data.profile_picture)
        this.userData = data;
        console.log(data);
        const userObj = new User(
          data.first_name,
          data.last_name,
          data.email,
          data.gender,
          data.date_of_birth,
          data.profile_picture,
          data.verified,
          ''
        );
        this.userData = userObj;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
