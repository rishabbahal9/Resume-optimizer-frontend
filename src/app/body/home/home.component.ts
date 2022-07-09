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
    console.log("Home ngInit")
    this.authService.getIsLoggedIn().subscribe((response) => {
      console.log('response');
      console.log(response);
      this.isLoggedIn = response.isLoggedIn;
      this.userData = response.user;
    });
  }
}
