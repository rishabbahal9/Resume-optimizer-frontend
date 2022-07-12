import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn: Boolean = false;
  userData: User | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe({
      next: (response) => {
        this.isLoggedIn = response.isLoggedIn;
        this.userData = response.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
