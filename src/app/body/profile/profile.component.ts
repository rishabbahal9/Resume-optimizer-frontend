import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: User = new User('', '', '', '', '', '', '');
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (data: any) => {
        this.userData = data;
        const userObj = new User(
          data.first_name,
          data.last_name,
          data.email,
          data.gender,
          data.date_of_birth,
          data.profile_picture != ''
            ? data.profile_picture
            : data.gender == 'female'
            ? 'assets/images/woman.png'
            : 'assets/images/man.png',
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
