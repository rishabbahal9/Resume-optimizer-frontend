import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData: User | null = null;
  isLoggedIn: Boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((response) => {
      this.isLoggedIn = response.isLoggedIn;
      this.userData = response.user;
    });
  }
  onLogout() {
    console.log('Logout pressed');
    this.authService.logout();
  }
}
