import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData: User = new User('', '', '', '', '', '', false, '');
  profilePicture: String = '';
  isLoggedIn: Boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe({
      next: (response) => {
        this.isLoggedIn = response.isLoggedIn;
        this.userData = response.user;
        if (this.userData && this.userData.profilePicture != '') {
          this.profilePicture = this.userData.profilePicture;
        } else {
          if (this.userData && this.userData.gender == 'female') {
            this.profilePicture = 'assets/images/woman.png';
          } else {
            this.profilePicture = 'assets/images/man.png';
          }
        }
      },
    });
  }
  onLogout() {
    this.authService.logout();
  }
}
